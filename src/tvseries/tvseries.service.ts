import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ShowService } from 'src/show/show.service';
import { TvSeriesEntity } from 'src/tvseries/tvseries.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TvseriesService extends ShowService {
  constructor(
    @InjectRepository(TvSeriesEntity)
    private readonly tvseriesRepository: Repository<TvSeriesEntity>,
  ) {
    super(tvseriesRepository);
  }
}
