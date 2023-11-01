import { UserRequest } from "@fit-friends/shared/app-types";
import { IsEnum, IsOptional } from "class-validator";

export class UpdateRequestDto {
  @IsOptional()
  userId: string;

  @IsOptional()
  trainerId: string;

  @IsOptional()
  @IsEnum(UserRequest)
  status: string;
}
