import { Injectable } from "@nestjs/common";
import { RequestRepository } from "./request.repository";
import { CreateRequestDto } from "./dto/create-request.dto";
import { RequestEntity } from "./request.entity";
import { UserRequest } from "@fit-friends/shared/app-types";
import { UpdateRequestDto } from "./dto/update-request.dto";

@Injectable()
export class RequestService {
  constructor(
    private readonly requestRepository: RequestRepository,
  ) {}

  public async addRequest(request: CreateRequestDto) {

    const existRequest = await this.requestRepository.findByUsers(request.userId, request.initiatorId)

    if (existRequest) {
      return existRequest
    }

    return this.requestRepository
    .create(new RequestEntity({...request, status: UserRequest.approval}))
  }

  public async updateRequest(id: string, dto: UpdateRequestDto) {

    const request = await this.getRequest(id)

    if(request.status === dto.status) {
      return request
    }

    return this.requestRepository.update(id, {...dto, status: dto.status})
  }

  public async getRequest(id: string) {
    return this.requestRepository.findById(id);
  }

  public async gerRequestsByUser(userId: string) {
    return this.requestRepository.findByUserId(userId)
  }

}
