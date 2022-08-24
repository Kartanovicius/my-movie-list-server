import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { getTypeOrmConfig } from './config/typeorm.config';
import { MediaModule } from './media/media.module';
import { MovieModule } from './movie/movie.module';
import { ShowModule } from './show/show.module';
import { TvseriesModule } from './tvseries/tvseries.module';
import { UserModule } from './user/user.module';
import { DatabaseFilesModule } from './database-files/database-files.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    UserModule,
    AuthModule,
    MediaModule,
    ShowModule,
    CommentModule,
    MovieModule,
    TvseriesModule,
    DatabaseFilesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
