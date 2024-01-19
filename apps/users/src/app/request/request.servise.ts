import { ConflictException, Injectable } from "@nestjs/common";
import { RequestRepository } from "./request.repository";
import { CreateRequestDto } from "./dto/create-request.dto";
import { RequestEntity } from "./request.entity";
import { UserRequest } from "@fit-friends/shared/app-types";
import { UpdateRequestDto } from "./dto/update-request.dto";
import { AuthUserError } from "../authentication/authentication.constant";

@Injectable()
export class RequestService {
  constructor(
    private readonly requestRepository: RequestRepository,
  ) {}

  public async addRequest(request: CreateRequestDto) {

    const existRequest = await this.requestRepository.findByUsers(request.userId, request.initiatorId)

    if (existRequest) {
      throw new ConflictException(AuthUserError.Exists);
    }

    return this.requestRepository
    .create(new RequestEntity({...request, status: UserRequest.approval}))
  }

  public async updateRequest(userId: string, initiatorId: string, dto: UpdateRequestDto) {

    //const request = await this.getRequest(id)
    const request = await this.requestRepository.findByUsers(userId, initiatorId)
console.log(request._id)
    if(request.status === dto.status) {
      return request
    }

    return this.requestRepository.update(request._id, {...dto, status: dto.status})
  }

  public async getRequest(userId: string, initiatorId: string) {
    return this.requestRepository.findByUsers(userId, initiatorId)
  }

  public async gerRequestsByUser(userId: string) {
    return this.requestRepository.findByUserId(userId)
  }

  public async existRequest (userId: string, initiatorId: string) {
    const existRequest = await this.requestRepository.findByUsers(userId, initiatorId)
    if (existRequest) {
      throw new ConflictException(AuthUserError.Exists);
    }
    return null
  }

}
