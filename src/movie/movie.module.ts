import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieController } from './movie.controller';
import { MovieEntity } from './movie.entity';
import { MovieService } from './movie.service';

@Module({
  controllers: [MovieController],
  providers: [MovieService],
  imports: [TypeOrmModule.forFeature([MovieEntity])],
})
export class MovieModule {}
