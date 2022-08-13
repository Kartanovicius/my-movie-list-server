import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { getTypeOrmConfig } from './config/typeorm.config';
import { MediaModule } from './media/media.module';
import { MovieCommentModule } from './movie-comment/movie-comment.module';
import { MovieModule } from './movie/movie.module';
import { UserModule } from './user/user.module';
import { TvseriesModule } from './tvseries/tvseries.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getTypeOrmConfig,
    }),
    UserModule,
    MovieModule,
    MovieCommentModule,
    AuthModule,
    MediaModule,
    TvseriesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
