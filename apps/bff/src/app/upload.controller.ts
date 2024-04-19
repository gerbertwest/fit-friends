import { HttpService } from "@nestjs/axios";
import { Controller, Delete, HttpStatus, Query, UseFilters, UseGuards } from "@nestjs/common";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AxiosExceptionFilter } from "./filters/axios-exception.filter";
import { ApplicationServiceURL } from "./app.config";
import { CheckAuthGuard } from "./guards/check-auth.guard";

@ApiTags('Upload')
@Controller('upload')
@UseFilters(AxiosExceptionFilter)
export class UploadController {
  constructor(
    private readonly httpService: HttpService
  ) {}

  @ApiResponse({
    status: HttpStatus.OK,
    description: 'File has been deleted'
  })
  @UseGuards(CheckAuthGuard)
  @Delete('deleteFile')
  public async fileDelete(@Query('path') file: string) {

    const filePath = file.replace('/static', '')
    await this.httpService.axiosRef.delete(`${ApplicationServiceURL.Upload}?path=${filePath}`)

  }

}
