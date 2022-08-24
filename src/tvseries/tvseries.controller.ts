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
import { TvSeriesDto } from './tvseries.dto';
import { TvseriesService } from './tvseries.service';

@Controller('tvseries')
export class TvseriesController {
  constructor(private readonly tvseriesService: TvseriesService) {}

  /* Get */
  @Get()
  async getTvSeries() {
    return this.tvseriesService.getAll();
  }

  @Get('most-viewed')
  async getMostViewed() {
    return this.tvseriesService.getMostViewedShow();
  }

  @Get('highest-rated')
  async getHighestRated() {
    return this.tvseriesService.getHighestRatedShow();
  }

  @Get(':id')
  async getTvSeriesById(@Param('id') id: string) {
    return this.tvseriesService.byId(+id);
  }
  /* End Get */

  /* Post */
  @HttpCode(200)
  @Post()
  @Auth()
  async createTvSeries() {
    return this.tvseriesService.create();
  }
  /* End Post */

  /* Put */
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateTvSeries(@Param('id') id: string, @Body() dto: TvSeriesDto) {
    return this.tvseriesService.update(+id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update-views/:id')
  async updateViews(@Param('id') id: string) {
    return this.tvseriesService.updateCountViews(+id);
  }
  /* End Put */

  /* Delete */
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete(':id')
  @Auth()
  async deleteTvSeries(@Param('id') id: string) {
    return this.tvseriesService.delete(+id);
  }
  /* End Delete */
}
