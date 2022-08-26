import { Controller } from '@nestjs/common';
import { ShowController } from 'src/show/show.controller';
import { TvseriesService } from './tvseries.service';

@Controller('tvseries')
export class TvseriesController extends ShowController {
  constructor(private readonly tvseriesService: TvseriesService) {
    super(tvseriesService);
  }
}
