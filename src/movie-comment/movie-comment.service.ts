import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieCommentDto } from './movie-comment.dto';
import { MovieCommentEntity } from './movie-comment.entity';

@Injectable()
export class MovieCommentService {
  constructor(
    @InjectRepository(MovieCommentEntity)
    private readonly commentRepository: Repository<MovieCommentEntity>,
  ) {}

  async create(userId: number, dto: MovieCommentDto) {
    const newComment = this.commentRepository.create({
      message: dto.message,
      movie: { id: dto.movieId },
      user: { id: userId },
    });

    return this.commentRepository.save(newComment);
  }
}
