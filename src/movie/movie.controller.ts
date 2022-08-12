import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { MovieDto } from './movie.dto';
import { MovieService } from './movie.service';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get()
  async getMovies() {
    return this.movieService.getAll();
  }

  @Get('most-viewed')
  async getMostViewed() {
    return this.movieService.getMostViewedMovie();
  }

  @Get('highest-rated')
  async getHighestRated() {
    return this.movieService.getHighestRatedMovie();
  }

  @Get(':id')
  async getMovie(@Param('id') id: string) {
    return this.movieService.byId(+id);
  }

  @HttpCode(200)
  @Post()
  @Auth()
  async createMovie() {
    return this.movieService.create();
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateMovie(@Param('id') id: string, @Body() dto: MovieDto) {
    return this.movieService.update(+id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async deleteMovie(@Param('id') id: string) {
    return this.movieService.delete(+id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update-views/:id')
  async updateViews(@Param('id') id: string) {
    return this.movieService.updateCountViews(+id);
  }
}
