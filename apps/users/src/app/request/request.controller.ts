import { Controller } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { NotifyService } from "../notify/notify.service";
import { RequestService } from "./request.servise";

@ApiTags('request')
@Controller('request')
export class RequestController {
  constructor(
    private readonly requestService: RequestService,
    private readonly notifyService: NotifyService,
  ) {}


}
