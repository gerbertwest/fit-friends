import { Request } from "@fit-friends/shared/app-types";

export class RequestEntity implements Request {
  public requestId?: string;
  public userId: string;
  public trainerId: string;
  public status: string;

  constructor(request: Request) {
    this.fillEntity(request);
  }

  public fillEntity(request: Request) {
    this.requestId = request.requestId;
    this.userId = request.userId;
    this.trainerId = request.trainerId;
    this.status = request.status;
  }

  public toObject(): RequestEntity {
    return {...this};
  }
}
