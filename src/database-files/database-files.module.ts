import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseFilesController } from './database-files.controller';
import { DatabaseFilesEntity } from './database-files.entity';
import { DatabaseFilesService } from './database-files.service';

@Module({
  controllers: [DatabaseFilesController],
  providers: [DatabaseFilesService],
  imports: [TypeOrmModule.forFeature([DatabaseFilesEntity])],
})
export class DatabaseFilesModule {}
