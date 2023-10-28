import { OrderPaymentMethod } from "@fit-friends/shared/app-types";
import { Equals, IsEnum, IsInt, IsNumber, Max, Min } from "class-validator";
import { DEFAULT_ORDER_TYPE, Length, OrderError } from "../order.constant";
import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {

  @ApiProperty({
    description: 'Order type',
    example: 'абонемент',
  })
  @Equals(DEFAULT_ORDER_TYPE)
  public type: string;

  @ApiProperty({
    description: 'Training id',
    example: 1,
  })
  @IsNumber()
  public trainingId: number;

  public price: number;

  @ApiProperty({
    description: 'orders count',
    example: 2,
  })
  @IsNumber()
  @IsInt()
  @Min(Length.MinCount, {message: OrderError.MinCount})
  @Max(Length.MaxCount, {message: OrderError.MaxCount})
  public count: number;

  public orderPrice: number;

  @ApiProperty({
    description: 'Paiment method',
    example: 'visa'
  })
  @IsEnum(OrderPaymentMethod)
  public paymentMethod: string;

  public createdAt: Date;

  public userId: string;
}
