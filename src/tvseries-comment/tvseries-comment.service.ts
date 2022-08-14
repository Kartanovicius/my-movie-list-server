import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TvSeriesCommentDto } from './tvseries-comment.dto';
import { TvSeriesCommentEntity } from './tvseries-comment.entity';

@Injectable()
export class TvSeriesCommentService {
  constructor(
    @InjectRepository(TvSeriesCommentEntity)
    private readonly commentRepository: Repository<TvSeriesCommentEntity>,
  ) {}

  async create(userId: number, dto: TvSeriesCommentDto) {
    const newComment = this.commentRepository.create({
      message: dto.message,
      tvseries: { id: dto.tvseriesId },
      user: { id: userId },
    });

    return this.commentRepository.save(newComment);
  }
}
