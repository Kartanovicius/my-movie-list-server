import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcryptjs';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async byId(id: number) {
    const user = this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        videos: true,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async userUpdate(id: number, dto: UserDto) {
    const user = await this.byId(id);

    const isSameUser = await this.userRepository.findOneBy({
      email: dto.email,
    });

    if (isSameUser && id !== isSameUser.id)
      throw new BadRequestException('Email already used');

    if (dto.password) {
      const salt = await genSalt(10);
      user.password = hash(dto.password, salt);
    }

    user.email = dto.email;
    user.name = dto.name;
    user.description = dto.description;
    user.avatarPath = dto.avatarPath;

    return this.userRepository.save(user);
  }

  async getAll() {
    return this.userRepository.find();
  }
}
