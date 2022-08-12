import { Injectable } from '@nestjs/common';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('app-root-path');
import { ensureDir, writeFile } from 'fs-extra';
import { IMediaResponse } from './media.interafce';

@Injectable()
export class MediaService {
  async saveMedia(
    mediaFile: Express.Multer.File,
    folder = 'default',
  ): Promise<IMediaResponse> {
    const uploadFolder = `${path}/upload/${folder}`;
    await ensureDir(uploadFolder);

    await writeFile(
      `${uploadFolder}/${mediaFile.originalname}`,
      mediaFile.buffer,
    );

    return {
      url: `/uploads/${folder}/${mediaFile.originalname}`,
      name: mediaFile.originalname,
    };
  }
}
