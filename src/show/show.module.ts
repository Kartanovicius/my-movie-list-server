import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from 'src/comment/comment.entity';
import { ShowController } from './show.controller';
import { ShowEntity } from './show.entity';
import { ShowService } from './show.service';

@Module({
  controllers: [ShowController],
  providers: [ShowService],
  imports: [TypeOrmModule.forFeature([ShowEntity, CommentEntity])],
})
export class ShowModule {}
