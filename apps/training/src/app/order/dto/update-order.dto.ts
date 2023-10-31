import { IsBoolean, IsOptional } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateOrderDto {

  @ApiProperty({
    description: 'active',
    example: 'true',
  })
  @IsOptional()
  @IsBoolean()
  public active: boolean;
}
