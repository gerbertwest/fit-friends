import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class RequestRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '1'
  })
  @Expose()
  userId: string;

  @ApiProperty({
    description: 'The uniq initiator ID',
    example: '1'
  })
  @Expose()
  initiatorId: string;

  @ApiProperty({
    description: 'Request status',
    example: 'принят'
  })
  @Expose()
  status: string;
}
