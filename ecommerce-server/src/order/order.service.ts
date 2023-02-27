import {BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { DtoConstants } from 'common/constants/dto.constants'
import { OrderErrorConstants } from 'common/constants/error.constants'
import { convertArrToStr } from 'common/utils/convert-arr-to-str'
import { toCaseCount } from 'common/utils/to-case-count';
import { Model, Types } from 'mongoose';
import { PaymentService } from 'src/payment/payment.service'
import { ProductService } from 'src/product/product.service'
import { TelegramService } from 'src/telegram/telegram.service'
import { CreateOrderDto } from './dto/create-order.dto'
import { Order, OrderDocument } from './schema/order.schema'

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name)
        private readonly orderModel: Model<OrderDocument>,
        private readonly productService: ProductService,
        private readonly paymentService: PaymentService,
        private readonly telegramService: TelegramService
    ) {}

    public async create(userId: Types.ObjectId, dto: CreateOrderDto): Promise<OrderDocument> {
        const {
            orderItems,
            shippingAddress,
            paymentMethod,
            productsPrice,
            shippingPrice,
            taxPrice,
            totalPrice,
        } = dto

        if (orderItems && orderItems.length === 0) {
            throw new BadRequestException(OrderErrorConstants.ORDER_LENGTH_0)
        } else {

            let res = []
            await Promise.all(orderItems.map(async (item) => {
                const ok = await this.productService.checkProductCountInStock(item.product, item.quantity)
                res.push(ok)
            }))

            if (res.filter(r => r.error).length > 0) {
                throw new BadRequestException(toCaseCount(res) + ` ${convertArrToStr(res)} ` + OrderErrorConstants.LESS_THAN)
            }

            await Promise.all(orderItems.map(async (item, idx) => {
                const ok = await this.productService.updateProductCountInStock(res[idx].id, res[idx].countInStock, res[idx].quantity)
                return ok
            }))

            const order = new this.orderModel({
                user: userId,
                orderItems,
                shippingAddress,
                paymentMethod,
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
        return await this.getOrders('admin', page, limitOfPages, searchTerm, sort)
    }

    public async getMy(
        userId: Types.ObjectId,
        page: number = 0,
        limitOfPages?: number,
        searchTerm?: string,
        sort?: string
    ):  Promise<any> {
       return await this.getOrders('my', page, limitOfPages, searchTerm, sort, userId)
    }

    private async getOrders(
        access: string,
        page: number = 0,
        limitOfPages?: number,
        searchTerm?: string,
        sort?: string,
        userId?: Types.ObjectId,
    ):  Promise<any> {
        let sortOptions = {}
        let res = null
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

        if (access === 'admin') {
            res = await this.orderModel
                .find({})
                .populate({
                    path: 'user',
                    select: 'firstName lastName email'
                })
                .populate({
                    path: 'orderItems',
                    populate: {
                        path: 'product',
                        model: 'Product',
                        select: 'title imageUrl price'
                    }
                })
                .select('-__v')
                .sort(sortOptions)
                .skip(page)
                .limit(limitOfPages)
                .exec()
        } else {
            res = await this.orderModel
                .findOne({ user: userId })
                .populate({
                    path: 'orderItems',
                    populate: {
                        path: 'product',
                        model: 'Product',
                        select: 'title imageUrl price'
                    }
                })
                .select('-__v -user')
                .sort(sortOptions)
                .skip(page)
                .limit(limitOfPages)
                .exec()
        }

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
        const order = await this.orderModel
          .findById(id)
          .populate("user")
          .populate({
              path: 'orderItems',
              populate: {
                  path: 'product',
                  model: 'Product',
                  select: '_id title imageUrl price slug'
              }
          })
          .select('-__v')

        if (!order) {
            throw new NotFoundException(OrderErrorConstants.NOT_FOUND)
        }

        return order
    }

    public async updatePayingStatus(id: Types.ObjectId, dto: any) {
        const order = await this.orderModel.findById(id)
        const payment = await this.paymentService.payment({amount: Number(dto.totalPrice)})

        if (order && payment) {
             order.isPaid = true
             order.paidAt = new Date(Date.now())
             order.paymentMethod = dto.paymentMethod

            return await order.save()
        } else {
            throw new NotFoundException(OrderErrorConstants.NOT_FOUND)
        }
    }

    public async updateDeliveringStatus(id: Types.ObjectId) {
        const order = await this.orderModel.findById(id)

        if (order && order.isPaid) {
            order.isDelivered = true;
            order.deliveredAt = new Date(Date.now())

            return await order.save()
        } else {
            throw new NotFoundException(OrderErrorConstants.NOT_FOUND)
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
                            url: '123',
                            text: '123',
                        },
                    ],
                ],
            },
        })
    }
}
