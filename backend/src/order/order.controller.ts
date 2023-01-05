import {Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common"
import { Types } from "mongoose"
import { Auth } from "src/auth/decorators/auth.decorator"
import { User } from "src/user/decorators/user.decorator"
import { CreateOrderDto } from "./dto/create-order.dto"
import { OrderService } from "./order.service"
import { OrderDocument } from "./schema/order.schema"

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Auth()
    @Post()
    public async createOrder(
        @User('id') id: Types.ObjectId,
        @Body() dto: CreateOrderDto
    ): Promise<OrderDocument> {
        return this.orderService.create(id, dto)
    }

    @Get()
    public async getOrders(
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('search') searchTerm?: string,
        @Query('sort') sort?: string
    ) {
        return this.orderService.getAll(page, limit, searchTerm, sort)
    }

    @Auth()
    @Get('my')
    public async getMyOrders(
        @User('id') id: Types.ObjectId,
        @Query('page') page?: number,
        @Query('limit') limit?: number,
        @Query('search') searchTerm?: string,
        @Query('sort') sort?: string
    ) {
        return this.orderService.getMy(id, page, limit, searchTerm, sort)
    }

    @Get(':id')
    public async getOrderById(@Param('id') id: Types.ObjectId,) {
        return this.orderService.getById(id)
    }

    @Patch(':id/pay')
    public async updatePayingStatus(@Param('id') id: Types.ObjectId, @Body() dto: any) {
        return this.orderService.updatePayingStatus(id, dto)
    }

    @Patch(':id/deliver')
    public async updateDeliveringStatus(@Param('id') id: Types.ObjectId) {
        return this.orderService.updateDeliveringStatus(id)
    }
}
