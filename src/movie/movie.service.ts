import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsWhereProperty, ILike, MoreThan, Repository } from 'typeorm';
import { MovieDto } from './movie.dto';
import { MovieEntity } from './movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {}

  async byId(id: number) {
    const movie = this.movieRepository.findOne({
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

    if (!movie) throw new NotFoundException('Movie not found');

    return movie;
  }

  async update(id: number, dto: MovieDto) {
    const movie = await this.byId(id);

    return this.movieRepository.save({ ...movie, ...dto });
  }

  async getAll(searchTerm?: string) {
    let options: FindOptionsWhereProperty<MovieEntity> = {};

    if (options)
      options = {
        name: ILike(`%${searchTerm}%`),
      };

    return this.movieRepository.find({
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

  async getMostViewedMovie() {
    return this.movieRepository.find({
      where: {
        views: MoreThan(0),
      },
      order: {
        views: -1,
      },
    });
  }

  async getHighestRatedMovie() {
    return this.movieRepository.find({
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
      moviePath: '',
      posterPath: '',
    };

    const newMovie = this.movieRepository.create(defaultValue);
    const movie = await this.movieRepository.save(newMovie);

    return movie.id;
  }

  async delete(id: number) {
    return this.movieRepository.delete({ id });
  }

  async updateCountViews(id: number) {
    const movie = await this.byId(id);
    movie.views++;
    return this.movieRepository.save(movie);
  }
}
