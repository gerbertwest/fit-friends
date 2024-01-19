import { Request } from "@fit-friends/shared/app-types";

export class RequestEntity implements Request {
  public _id?: string;
  public userId: string;
  public initiatorId: string;
  public status: string;

  constructor(request: Request) {
    this.fillEntity(request);
  }

  public fillEntity(request: Request) {
    this._id = request._id;
    this.userId = request.userId;
    this.initiatorId = request.initiatorId;
    this.status = request.status;
  }

  public toObject(): RequestEntity {
    return {...this};
  }
}
