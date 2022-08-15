import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ShowEntity } from 'src/show/show.entity';
import { MovieController } from './movie.controller';
import { MovieEntity } from './movie.entity';
import { MovieService } from './movie.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [TypeOrmModule.forFeature([MovieEntity, ShowEntity])],
})
export class MovieModule {}
