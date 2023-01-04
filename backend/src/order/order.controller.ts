import { Controller, Get, Patch, Post } from '@nestjs/common';

@Controller('orders')
export class OrderController {

    @Post()
    public async createOrder() {

    }

    @Get()
    public async getOrderById() {

    }

    @Patch()
    public async updateStatusOrderForPaying() {

    }

    @Patch()
    public async updateStatusOrderForDelivering() {

    }

    @Get()
    public async getMyOrders() {

    }

    //admin
    @Get()
    public async getOrders() {

    }
}
