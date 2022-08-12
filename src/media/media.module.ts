import { Module } from '@nestjs/common';
import { MediaService } from './media.service';
import { MediaController } from './media.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import path from 'app-root-path';

@Module({
  controllers: [MediaController],
  providers: [MediaService],
  imports: [
    ServeStaticModule.forRoot({
      rootPath: `${path}/upload`,
      serveRoot: '/upload',
    }),
  ],
})
export class MediaModule {}
