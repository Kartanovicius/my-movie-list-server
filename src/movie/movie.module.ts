import { Module } from '@nestjs/common';
import { MovieService } from './movie.service';
import { MovieController } from './movie.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from './movie.entity';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [TypeOrmModule.forFeature([MovieEntity])],
})
export class MovieModule {}
