import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowEntity } from 'src/show/show.entity';
import { FindOptionsWhereProperty, Like, MoreThan, Repository } from 'typeorm';
import { ShowDto } from './show.dto';

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
    console.log(searchTerm);

    if (options)
      options = {
        name: Like(`%${searchTerm}%`),
      };

    return this.showRepository.find({
      where: {
        ...options,
      },
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

  async getLastAddedShow(limit = 1) {
    const shows = await this.showRepository.find({
      order: {
        rating: 'DESC',
      },
      take: limit,
    });

    return limit == 1 ? shows[0] : shows;
  }

  async updateCountViews(id: number) {
    const show = await this.byId(id);
    show.views++;
    return this.showRepository.save(show);
  }

  async update(id: number, dto: ShowDto) {
    const show = await this.byId(id);

    if (!show) throw new NotFoundException('Show was not found');

    return this.showRepository.save({ ...show, ...dto });
  }

  async create() {
    const defaultValue = {
      name: '',
      description: '',
      trailerPath: '',
      posterPath: '',
    };

    const newMovie = this.showRepository.create(defaultValue);
    const movie = await this.showRepository.save(newMovie);

    return movie.id;
  }

  async delete(id: number) {
    return this.showRepository.delete({ id });
  }
}
