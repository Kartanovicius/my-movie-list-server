import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowService } from 'src/show/show.service';
import { Repository } from 'typeorm';
import { MovieDto } from './movie.dto';
import { MovieEntity } from './movie.entity';

@Injectable()
export class MovieService extends ShowService {
  constructor(
    @InjectRepository(MovieEntity)
    private readonly movieRepository: Repository<MovieEntity>,
  ) {
    super(movieRepository);
  }

  async update(id: number, dto: MovieDto) {
    const movie = await this.byId(id);

    return this.movieRepository.save({ ...movie, ...dto });
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
}
