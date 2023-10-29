import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { UserRdo } from "./user.rdo";

export class OrderRdo {
  @ApiProperty({
    description: 'The uniq order ID',
    example: '1'
  })
  @Expose()
  public orderId: number;

  @ApiProperty({
    description: 'Order type',
    example: 'абонемент',
  })
  @Expose()
  public type: string;

  @ApiProperty({
    description: 'Training id',
    example: 1,
  })
  @Expose()
  public trainingId: number;

  @ApiProperty({
    description: 'Price',
    example: 100,
  })
  @Expose()
  public price: number;

  @ApiProperty({
    description: 'orders count',
    example: 2,
  })
  @Expose()
  public count: number;

  @ApiProperty({
    description: 'Total price',
    example: 200,
  })
  @Expose()
  public orderPrice: number;

  @ApiProperty({
    description: 'Payment method',
    example: 'visa'
  })
  @Expose()
  public paymentMethod: string;

  @ApiProperty({
    description: 'Order create date',
    example: "2023-09-03T19:43:02.250Z",
  })
  @Expose({ name: 'createdAt' })
  public createDate: Date;

  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Expose()
  public user: UserRdo;
}
