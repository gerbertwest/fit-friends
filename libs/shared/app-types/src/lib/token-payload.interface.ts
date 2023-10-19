import { UserRole } from "./users.enum";

export interface TokenPayload {
  sub: string;
  email: string;
  role: UserRole;
  name: string;
}
