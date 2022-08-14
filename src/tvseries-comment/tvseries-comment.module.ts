import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { TvSeriesCommentController } from './tvseries-comment.controller';
import { TvSeriesCommentEntity } from './tvseries-comment.entity';
import { TvSeriesCommentService } from './tvseries-comment.service';

@Module({
  controllers: [TvSeriesCommentController],
  providers: [TvSeriesCommentService],
  imports: [TypeOrmModule.forFeature([TvSeriesCommentEntity])],
})
export class TvSeriesCommentModule {}
