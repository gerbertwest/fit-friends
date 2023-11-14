import { UserRole } from '@fit-friends/shared/app-types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose, Transform } from 'class-transformer';
import { ValidateIf } from 'class-validator';

export class UserRdo {
  @ApiProperty({
    description: 'The uniq user ID',
    example: '13'
  })
  @Expose({ name: '_id'})
  @Transform(({obj}) => obj._id.toString())
  public id: string;

  @ApiProperty({
    description: 'User email',
    example: 'user@user.local'
  })
  @Expose()
  public email: string;

  @ApiProperty({
    description: 'User first name',
    example: 'Keks'
  })
  @Expose()
  public name: string;

  @ApiProperty({
    description: 'Role',
    example: 'Исполнитель'
  })
  @Expose()
  public role: string;

  @ApiProperty({
    description: 'Register date (ISO format)',
    example: '03.09.2023'
  })
  @Expose({ name: 'createdAt'})
  public registerDate: Date;

  @ApiProperty({
    description: 'Sex',
    example: 'Мужской'
  })
  @Expose()
  public sex: string;

  @ApiProperty({
    description: 'User avatar',
    example: 'example.jpg'
  })
  @Expose()
  public avatar: string;

  @ApiProperty({
    description: 'User description',
    example: 'description',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    description: 'Subway',
    example: 'Пионерская'
  })
  @Expose()
  public location: string;

  @ApiProperty({
    description: 'User background Image',
    example: 'example.jpg'
  })
  @Expose()
  public backgroundImage: string;

  @ApiProperty({
    description: 'User level',
    example: 'новичок',
  })
  @Expose()
  public level: string;

  @ApiProperty({
    description: 'training type',
    example: ['йога', 'бег'],
  })
  @Expose()
  public trainingType: string[];

  // поля для роли Пользователь

  @ApiProperty({
    description: 'training time',
    example: '10-30 мин',
  })
  @ValidateIf(o => o.role === UserRole.User)
  @Expose()
  public trainingTime?: string;

  @ApiProperty({
    description: 'calories to lose',
    example: 1000,
  })
  @ValidateIf(o => o.role === UserRole.User)
  @Expose()
  public caloriesToLose?: number;


  @ApiProperty({
    description: 'calories to burn per day',
    example: 1000,
  })
  @ValidateIf(o => o.role === UserRole.User)
  @Expose()
  public caloriesToBurn?: number;

  @ApiProperty({
    description: 'ready to training',
    example: true,
  })
  @ValidateIf(o => o.role === UserRole.User)
  @Expose()
  public readyToTraining?: boolean;

  @ApiProperty({
    description: 'my friends',
    example: ['1'],
  })
  @ValidateIf(o => o.role === UserRole.User)
  @Expose()
  public friends?: string[];

  @ApiProperty({
    description: 'my subscriptions',
    example: ['1'],
  })
  @ValidateIf(o => o.role === UserRole.User)
  @Expose()
  public subscriptions?: string[];

  // поля для роли Тренер

  @ApiProperty({
    description: 'certificates',
    example: ['example.pdf']
  })
  @ValidateIf(o => o.role === UserRole.Admin)
  @Expose()
  public certificates?: string[];

  @ApiProperty({
    description: 'merits of treiner',
    example: 'merit',
  })
  @ValidateIf(o => o.role === UserRole.Admin)
  @Expose()
  public merits?: string;

  @ApiProperty({
    description: 'ready to personal training',
    example: true,
  })
  @ValidateIf(o => o.role === UserRole.Admin)
  @Expose()
  public personalTrainings?: boolean;

}
