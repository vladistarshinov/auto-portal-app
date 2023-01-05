import {BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { TelegramService } from 'src/telegram/telegram.service';
import { Order, OrderDocument } from './schema/order.schema';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name)
        private readonly orderModel: Model<OrderDocument>,
        private readonly telegramService: TelegramService
    ) {}

    public async create(userId: Types.ObjectId, dto: any) {
        const {
            orderItems,
            shippingAddress,
            payment,
            productsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        } = dto

        if (orderItems && orderItems.length === 0) {
            throw new BadRequestException("Нет товаров для заказа")
        } else {
            const order = new this.orderModel({
                user: userId,
                orderItems,
                shippingAddress,
                payment,
                productsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            })

            return await order.save()
        }
    }

    public async getAll(
        page: number = 0,
        limitOfPages?: number,
        searchTerm?: string,
        sort?: string
    ):  Promise<any> {
        let sortOptions = {}
        if (sort !== undefined && sort.includes('createdAt')) {
            if (sort[0] === '-')
                sortOptions = {
                    createdAt: 'desc'
                }
            else
                sortOptions = {
                    createdAt: 'asc'
                }
        } else if (sort !== undefined && sort.includes('title')) {
            if (sort[0] === '-')
                sortOptions = {
                    title: 'desc'
                }
            else
                sortOptions = {
                    title: 'asc'
                }
        } else {
            sortOptions = {
                createdAt: 'desc'
            }
        }

        const res = await this.orderModel
            .find({})
            .select('-updatedAt -__v')
            .sort(sortOptions)
            .skip(page)
            .limit(limitOfPages)
            .exec()

        const count = await this.orderModel.count()
        return {
            res,
            total: count,
            current_page: Number(page) + 1,
            from: 1,
            to: Math.floor(count / limitOfPages)
        }
    }

    public async getMy(
        userId: Types.ObjectId,
        page: number = 0,
        limitOfPages?: number,
        searchTerm?: string,
        sort?: string
    ):  Promise<any> {
        let sortOptions = {}
        if (sort !== undefined) {
            if (sort[0] === '-')
                sortOptions = {
                    createdAt: 'desc'
                }
            else
                sortOptions = {
                    createdAt: 'asc'
                }
        }

        const res = await this.orderModel
            .findOne({ user: userId })
            .select('-updatedAt -__v')
            .sort(sortOptions)
            .skip(page)
            .limit(limitOfPages)
            .exec()

        const count = await this.orderModel.count()
        return {
            res,
            total: count,
            current_page: Number(page) + 1,
            from: 1,
            to: Math.floor(count / limitOfPages)
        }

    }

    public async getById(id: Types.ObjectId) {
        const order = await this.orderModel.findById(String(id)).populate("user")

        if (!order) {
            throw new NotFoundException(`Заказ ${id} не найден`)
        }

        return order
    }

    public async updatePayingStatus(id: Types.ObjectId, dto: any) {
        const order = await this.orderModel.findById(id)

        if (order) {
             order.isPaid = true
             order.paidAt = new Date(Date.now())
             order.payment = {
                method: dto.method,
                status: dto.status,
                createdAt: dto.createdAt,
                email: dto.payment.email,
            }

            return await order.save()
        } else {
            throw new NotFoundException(`Заказ ${id} не найден`)
        }
    }

    public async updateDeliveringStatus(id: Types.ObjectId) {
        const order = await this.orderModel.findById(id)

        if (order) {
            order.isDelivered = true;
            order.deliveredAt = new Date(Date.now())

            return await order.save()
        } else {
            throw new Error(`Заказ ${id} не найден`)
        }
    }

    /* Utilites */
    public async sendNotifications(dto: any) {
        // if (process.env.NODE_ENV !== 'development')
        //    await this.telegramService.sendPhoto(dto.poster);

        const msg = `<b>${dto.title}</b>`;

        await this.telegramService.sendMessage(msg, {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            url: 'https://okko.tv/movie/free-guy',
                            text: '🍿 Go to watch',
                        },
                    ],
                ],
            },
        });
    }
}
