import { User } from '@prisma/client';
import { UserDto } from 'src/modules/users/application/dtos/user.dto';
import { UserEntity } from 'src/modules/users/domain/entities/user.entity';

export class UserMapper {
  static toPrismaModel(userDTO: UserDto): User {
    const prismaUser: User = {
      id: userDTO.id,
      email: userDTO.email,
      password: userDTO.password,
      createdAt: userDTO.createdAt,
      updatedAt: userDTO.updatedAt,
    };

    return prismaUser;
  }

  static fromPrismaModel(prismaUser: User): UserDto {
    const userDto: UserDto = {
      id: prismaUser.id,
      email: prismaUser.email,
      password: prismaUser.password,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    };

    return userDto;
  }

  static toTypeORMEntity(userDto: UserDto): UserEntity {
    const userEntity = new UserEntity();

    userEntity.id = userDto.id;
    userEntity.email = userDto.email;
    userEntity.password = userDto.password;
    userEntity.createdAt = userDto.createdAt;
    userEntity.updatedAt = userDto.updatedAt;

    return userEntity;
  }

  static fromTypeORMEntity(userEntity: UserEntity): UserDto {
    const userDTO: UserDto = {
      id: userEntity.id,
      email: userEntity.email,
      password: userEntity.password,
      createdAt: userEntity.createdAt,
      updatedAt: userEntity.updatedAt,
    };

    return userDTO;
  }
}
