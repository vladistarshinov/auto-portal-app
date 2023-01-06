import { IsNumber } from 'class-validator'

export class PaymentDto {
	@IsNumber()
	amount: number
}
