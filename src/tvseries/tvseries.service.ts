import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowService } from 'src/show/show.service';
import { TvSeriesEntity } from 'src/tvseries/tvseries.entity';
import { Repository } from 'typeorm';
import { TvSeriesDto } from './tvseries.dto';

@Injectable()
export class TvseriesService extends ShowService {
  constructor(
    @InjectRepository(TvSeriesEntity)
    private readonly tvseriesRepository: Repository<TvSeriesEntity>,
  ) {
    super(tvseriesRepository);
  }

  async update(id: number, dto: TvSeriesDto) {
    const tvseries = await this.byId(id);

    return this.tvseriesRepository.save({ ...tvseries, ...dto });
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
