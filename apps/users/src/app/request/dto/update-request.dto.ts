import { UserRequest } from "@fit-friends/shared/app-types";
import { IsEnum } from "class-validator";

export class UpdateRequestDto {
  @IsEnum(UserRequest)
  status: string;
}
