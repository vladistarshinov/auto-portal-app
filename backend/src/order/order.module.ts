import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentModule } from 'src/payment/payment.module';
import { ProductModule } from 'src/product/product.module';
import { TelegramModule } from 'src/telegram/telegram.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Order, OrderSchema } from './schema/order.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    TelegramModule,
    ProductModule,
    PaymentModule
  ],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
