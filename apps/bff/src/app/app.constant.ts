import { UserRole } from "@fit-friends/shared/app-types";


export enum TrainingError {
  Status = 'Только на новые задачи можно откликаться',
  Role = 'Пользователь с этой ролью не может присвоить этот статус',
  Contractor = 'ContractorId not found',
  FileSize = 'Размер файла превышает допустимый',
}

export enum UserError {
  //FileSize = 'Размер файла превышает допустимый',
  //UserReview = 'Заказчики могут оставить отзыв только по тем исполнителям, которые выполняли его задания',
  AdminRole = `Только пользователь с ролью ${UserRole.Admin} может создавать тренировки`,
  RoleUser = `Только пользователь с ролью ${UserRole.User} может запрашивать каталог друзей и добавлять/удалять друзей`,
  //DeleteComment = 'Пользователь может удалять только свои комментарии',
  UpdateTraining = 'Пользователь может редактировать только свои тренировки'
}

// export enum FileSize {
//   MaxAvatar = 500000,
//   MaxTask = 1000000,
// }
