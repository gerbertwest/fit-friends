import { IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOrderDto {

  @ApiProperty({
    description: 'active',
    example: 'true',
  })
  @IsOptional()
  public active: boolean;
}
