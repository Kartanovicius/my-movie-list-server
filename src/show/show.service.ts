import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowEntity } from 'src/show/show.entity';
import { FindOptionsWhereProperty, Like, MoreThan, Repository } from 'typeorm';
import { ShowDto } from './show.dto';

const defaultPage = 1,
  defaultPerPage = 25;
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

  async getAll(
    searchTerm?: string,
    perPage = defaultPerPage,
    page = defaultPage,
    order: 'DESC' | 'ASC' = 'DESC',
  ) {
    let options: FindOptionsWhereProperty<ShowEntity> = {};
    const skip = perPage * page - perPage;

    if (options && searchTerm) {
      options = {
        name: Like(`%${searchTerm}%`),
      };
    }

    return this.showRepository.find({
      where: {
        ...options,
      },
      order: {
        createdAt: order,
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
      take: perPage,
      skip,
    });
  }

  async getMostViewedShow(
    perPage = defaultPerPage,
    page = defaultPage,
    order: 'DESC' | 'ASC' = 'DESC',
  ) {
    const skip = perPage * page - perPage;

    return this.showRepository.find({
      where: {
        views: MoreThan(0),
      },
      order: {
        views: order,
      },
      take: perPage,
      skip,
    });
  }

  async getHighestRatedShow(
    perPage = defaultPerPage,
    page = defaultPage,
    order: 'DESC' | 'ASC' = 'DESC',
  ) {
    const skip = perPage * page - perPage;

    return this.showRepository.find({
      where: {
        rating: MoreThan(0),
      },
      order: {
        rating: order,
      },
      take: perPage,
      skip,
    });
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
