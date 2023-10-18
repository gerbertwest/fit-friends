export enum Length {
  MinPassword = 6,
  MaxPassword = 12,
  MinName = 1,
  MaxName = 15,
  MinDescriprion = 10,
  MaxDescription = 140,
  MinCalories = 1000,
  MaxCalories = 5000,
  MaxArrayLength = 3,
}

export const MIN_USER_AGE = 18;

export enum AuthUserError {
  Exists = 'User with this email exists',
  NotFound = 'User not found',
  PasswordWrong = 'User password is wrong',
  EmailNotValid = 'The email is not valid',
  DateBirthNotValid = 'The user date birth is not valid',
  RoleNotValid = 'The role is not valid',
  SexNotValid = 'The sex is not valid',
  MinPasswordLength = `Minimum password length must be ${Length.MinPassword}`,
  MaxPasswordLength = `Maximum password length must be ${Length.MaxPassword}`,
  MinNameLength = `Minimum name length must be ${Length.MinName}`,
  MaxNameLength = `Maximum name length must be ${Length.MaxName}`,
  MinDescriprionLength = `Minimum description length must be ${Length.MinDescriprion}`,
  MaxDescriprionLength = `Maximum description length must be ${Length.MaxDescription}`,
  MinCalories = `Minimum calories to lose must be ${Length.MinCalories}`,
  MaxCalories = `Maximum calories to lose must be ${Length.MaxCalories}`,
  MaxValue = `Maximum number of values ${Length.MaxArrayLength}`,
}
