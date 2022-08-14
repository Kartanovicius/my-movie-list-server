import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TvseriesController } from './tvseries.controller';
import { TvSeriesEntity } from './tvseries.entity';
import { TvseriesService } from './tvseries.service';

@Module({
  controllers: [TvseriesController],
  providers: [TvseriesService],
  imports: [TypeOrmModule.forFeature([TvSeriesEntity])],
})
export class TvseriesModule {}
