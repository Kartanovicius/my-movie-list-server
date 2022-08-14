import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TvSeriesEntity } from 'src/tvseries/tvseries.entity';
import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from 'typeorm';
import { TvSeriesDto } from './tvseries.dto';

@Injectable()
export class TvseriesService {
  constructor(
    @InjectRepository(TvSeriesEntity)
    private readonly tvseriesRepository: Repository<TvSeriesEntity>,
  ) {}

  async byId(id: number) {
    const tvseries = this.tvseriesRepository.findOne({
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
          avatarPath: true,
        },
        comments: {
          id: true,
          message: true,
          user: {
            id: true,
            name: true,
            avatarPath: true,
          },
        },
      },
    });

    if (!tvseries) throw new NotFoundException('TvSeries not found');

    return tvseries;
  }

  async update(id: number, dto: TvSeriesDto) {
    const tvseries = await this.byId(id);

    return this.tvseriesRepository.save({ ...tvseries, ...dto });
  }

  async getAll(searchTerm?: string) {
    let options: FindOptionsWhereProperty<TvSeriesEntity> = {};

    if (options)
      options = {
        name: ILike(`%${searchTerm}%`),
      };

    return this.tvseriesRepository.find({
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
          avatarPath: true,
        },
        comments: {
          id: true,
          message: true,
          user: {
            id: true,
            name: true,
            avatarPath: true,
          },
        },
      },
    });
  }

  async getMostViewedTvSeries() {
    return this.tvseriesRepository.find({
      where: {
        views: MoreThan(0),
      },
      order: {
        views: -1,
      },
    });
  }

  async getHighestRatedTvSeries() {
    return this.tvseriesRepository.find({
      where: {
        rating: MoreThan(0),
      },
      order: {
        rating: 'DESC',
      },
    });
  }

  async create() {
    const defaultValue = {
      name: '',
      description: '',
      tvseriesPath: '',
      posterPath: '',
    };

    const newTvSeries = this.tvseriesRepository.create(defaultValue);
    const tvseries = await this.tvseriesRepository.save(newTvSeries);

    return tvseries.id;
  }

  async delete(id: number) {
    return this.tvseriesRepository.delete({ id });
  }

  async updateCountViews(id: number) {
    const tvseries = await this.byId(id);
    tvseries.views++;
    return this.tvseriesRepository.save(tvseries);
  }
}
