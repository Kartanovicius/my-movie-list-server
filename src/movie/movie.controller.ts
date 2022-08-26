import { Controller } from '@nestjs/common';
import { ShowController } from 'src/show/show.controller';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController extends ShowController {
  constructor(private readonly movieService: MovieService) {
    super(movieService);
  }
}
