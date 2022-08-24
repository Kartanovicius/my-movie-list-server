import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowEntity } from 'src/show/show.entity';
import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from 'typeorm';

@Injectable()
export class ShowService {
  constructor(
    @InjectRepository(ShowEntity)
    private readonly showRepository: Repository<ShowEntity>,
  ) {}

  async byId(id: number) {
    const show = this.showRepository.findOne({
      where: {
        id,
      },
      relations: {
        users: true,
        comments: {
          user: true,
        },
      },
      select: {
        users: {
          id: true,
          name: true,
          avatarId: true,
        },
        comments: {
          id: true,
          message: true,
          user: {
            id: true,
            name: true,
            avatarId: true,
          },
        },
      },
    });

    if (!show) throw new NotFoundException('Show not found');

    return show;
  }

  async getAll(searchTerm?: string) {
    let options: FindOptionsWhereProperty<ShowEntity> = {};

    if (options)
      options = {
        name: ILike(`%${searchTerm}%`),
      };

    return this.showRepository.find({
      order: {
        createdAt: 'DESC',
      },
      relations: {
        users: true,
        comments: {
          user: true,
        },
      },
      select: {
        users: {
          id: true,
          name: true,
          avatarId: true,
        },
        comments: {
          id: true,
          message: true,
          user: {
            id: true,
            name: true,
            avatarId: true,
          },
        },
      },
    });
  }

  async getMostViewedShow() {
    return this.showRepository.find({
      where: {
        views: MoreThan(0),
      },
      order: {
        views: -1,
      },
    });
  }

  async getHighestRatedShow() {
    return this.showRepository.find({
      where: {
        rating: MoreThan(0),
      },
      order: {
        rating: 'DESC',
      },
    });
  }

  async updateCountViews(id: number) {
    const show = await this.byId(id);
    show.views++;
    return this.showRepository.save(show);
  }
}
