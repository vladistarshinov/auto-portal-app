import {
    IsArray,
    IsBoolean,
    IsDate,
    IsEmail,
    IsNumber,
    IsObject,
    IsString
} from "class-validator"
import { IsObjectId } from "class-validator-mongo-object-id"
import { Types } from "mongoose"

export class OrderItem {
    @IsObjectId()
    product: Types.ObjectId

    @IsNumber()
    quantity: number
}

export class ShippingAddress {
    @IsString()
    address: string

    @IsString()
    city: string

    @IsString()
    postalCode: string

    @IsString()
    country: string
}


export class CreateOrderDto {

    @IsArray()
    orderItems: OrderItem[]

    @IsObject()
    shippingAddress: ShippingAddress

    @IsString()
    paymentMethod: string

    @IsString()
    productsPrice: string

    @IsString()
    taxPrice: string

    @IsString()
    shippingPrice: string

    @IsString()
    totalPrice: string
}