import { UserRequest } from "@fit-friends/shared/app-types";
import { IsEnum } from "class-validator";

export class CreateRequestDto {
  userId: string;

  trainerId: string;

  @IsEnum(UserRequest)
  status: string;
}
