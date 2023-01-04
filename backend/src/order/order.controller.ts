import {Body, Controller, Get, Param, Patch, Post, Query } from "@nestjs/common"
import { Types } from "mongoose"
import { User } from "src/user/decorators/user.decorator"
import { OrderService } from "./order.service"

@Controller('orders')
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Post()
    public async createOrder(@User('id') id: Types.ObjectId, @Body() dto: any) {
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

    @Get()
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

    @Patch(':id')
    public async updatePayingStatus(@Param('id') id: Types.ObjectId, @Body() dto: any) {
        return this.orderService.updatePayingStatus(id, dto)
    }
}
