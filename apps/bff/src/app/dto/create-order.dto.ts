import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {

  @ApiProperty({
    description: 'Order type',
    example: 'абонемент',
  })
  public type: string;

  @ApiProperty({
    description: 'Training id',
    example: 1,
  })
  public trainingId: number;

  public price: number;

  @ApiProperty({
    description: 'orders count',
    example: 2,
  })
  public count: number;

  public orderPrice: number;

  @ApiProperty({
    description: 'Paiment method',
    example: 'visa'
  })
  public paymentMethod: string;

  public createdAt: Date;

  public userId: string;
}
