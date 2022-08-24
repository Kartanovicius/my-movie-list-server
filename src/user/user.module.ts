import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFilesEntity } from 'src/database-files/database-files.entity';
import { DatabaseFilesService } from 'src/database-files/database-files.service';
import { ShowEntity } from 'src/show/show.entity';
import { UserController } from './user.controller';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [UserService, DatabaseFilesService],
  imports: [
    TypeOrmModule.forFeature([ShowEntity, UserEntity, DatabaseFilesEntity]),
  ],
})
export class UserModule {}
