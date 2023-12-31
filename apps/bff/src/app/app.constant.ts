import { UserRole } from "@fit-friends/shared/app-types";


export enum TrainingError {
  Status = 'Только на новые задачи можно откликаться',
  Role = 'Пользователь с этой ролью не может присвоить этот статус',
  Contractor = 'ContractorId not found',
  FileSize = 'Размер файла превышает допустимый',
}

export enum UserError {
  FileSize = 'Размер файла превышает допустимый',
  FileFormat = 'Недопустимый формат файла',
  AdminRole = `Только пользователь с ролью ${UserRole.Admin} может создавать тренировки`,
  RoleUser = `Только пользователь с ролью ${UserRole.User} может запрашивать каталог друзей, добавлять/удалять друзей, создавать заказ`,
  UpdateTraining = 'Пользователь может редактировать только свои тренировки',
  UpdateOrder = 'Пользователь может редактировать только свои заказы'
}

export enum FileSize {
  MaxAvatar = 1024000,
}
