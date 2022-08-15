import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { genSalt, hash } from 'bcryptjs';
import { ShowEntity } from 'src/show/show.entity';
import { Repository } from 'typeorm';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ShowEntity)
    private readonly showRepository: Repository<ShowEntity>,
  ) {}

  async byId(id: number) {
    const user = this.userRepository.findOne({
      where: {
        id,
      },
      relations: {
        likedShows: true,
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

  async addLikedShow(id: number, showId: number) {
    const user = await this.byId(id);
    const show = await this.showRepository.findOneBy({ id: showId });

    if (!show) throw new NotFoundException('Show is not found');

    user.likedShows.push(show);

    return await this.userRepository.save(user);
  }

  async deleteLikedShow(id: number, showId: number) {
    const user = await this.byId(id);

    const showToRemove = user.likedShows.findIndex((object) => {
      return object.id === showId;
    });

    if (showToRemove == -1)
      throw new NotFoundException(
        'Show is not found. Nothing have been deleted',
      );

    user.likedShows.splice(showToRemove, 1);

    return await this.userRepository.save(user);
  }
}
