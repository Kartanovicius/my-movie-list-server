import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRatingEntity } from './entities/user-rating.entity';
import { UserRatingController } from './user-rating.controller';
import { UserRatingService } from './user-rating.service';

@Module({
  controllers: [UserRatingController],
  providers: [UserRatingService],
  imports: [TypeOrmModule.forFeature([UserRatingEntity])],
})
export class UserRatingModule {}
