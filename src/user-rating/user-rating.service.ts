import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserRatingDto } from './dto/create-user-rating.dto';
import { UpdateUserRatingDto } from './dto/update-user-rating.dto';
import { UserRatingEntity } from './entities/user-rating.entity';

@Injectable()
export class UserRatingService {
  constructor(
    @InjectRepository(UserRatingEntity)
    private readonly userRatingRepository: Repository<UserRatingEntity>,
  ) {}

  async create(createUserRatingDto: CreateUserRatingDto, userId: number) {
    const newUserRating = this.userRatingRepository.create({
      rating: createUserRatingDto.rating,
      show: { id: createUserRatingDto.showId },
      user: { id: userId },
    });

    return this.userRatingRepository.save(newUserRating);
  }

  findAll(order: 'DESC' | 'ASC' = 'DESC') {
    return this.userRatingRepository.find({
      order: {
        createdAt: order,
      },
    });
  }

  findOne(id: number) {
    const userRating = this.userRatingRepository.findOne({
      where: {
        id,
      },
    });

    if (!userRating) throw new NotFoundException('Show not found');

    return userRating;
  }

  async update(id: number, updateUserRatingDto: UpdateUserRatingDto) {
    const show = await this.findOne(id);

    if (!show) throw new NotFoundException('Show was not found');

    return this.userRatingRepository.save({ ...show, ...updateUserRatingDto });
  }

  remove(id: number, userRole: string) {
    if (userRole !== 'admin')
      throw new ForbiddenException("Video can't be deleted by user");

    return this.userRatingRepository.delete({ id });
  }
}
