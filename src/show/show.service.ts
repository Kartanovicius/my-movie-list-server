import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowEntity } from 'src/show/show.entity';
import {
  ArrayContains,
  FindOptionsWhereProperty,
  ILike,
  MoreThan,
  Repository,
} from 'typeorm';
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
    searchTerm = '',
    perPage = defaultPerPage,
    page = defaultPage,
    order: 'DESC' | 'ASC' = 'DESC',
    genre: string[] | string = [],
  ) {
    if (!Array.isArray(genre)) {
      genre = genre.split(' ');
    }

    const options: FindOptionsWhereProperty<ShowEntity> = {
      name: ILike(`%${searchTerm}%`),
      genre: ArrayContains([...genre]),
    };

    const skip = perPage * page - perPage;

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
    genre: string[] | string = [],
  ) {
    const skip = perPage * page - perPage;

    if (!Array.isArray(genre)) {
      genre = genre.split(' ');
    }

    const options = {
      take: perPage,
      skip,
    };

    return this.showRepository.find({
      where: {
        views: MoreThan(0),
        genre: ArrayContains([...genre]),
      },
      order: {
        views: order,
      },
      ...options,
    });
  }

  async getHighestRatedShow(
    perPage = defaultPerPage,
    page = defaultPage,
    order: 'DESC' | 'ASC' = 'DESC',
    genre: string[] | string = [],
  ) {
    const skip = perPage * page - perPage;

    if (!Array.isArray(genre)) {
      genre = genre.split(' ');
    }

    return this.showRepository.find({
      where: {
        rating: MoreThan(0),
        genre: ArrayContains([...genre]),
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
    if (!show) throw new NotFoundException('Show was not found');
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

  async delete(id: number, userRole: string) {
    if (userRole !== 'admin')
      throw new ForbiddenException("Video can't be deleted by user");

    return this.showRepository.delete({ id });
  }
}
