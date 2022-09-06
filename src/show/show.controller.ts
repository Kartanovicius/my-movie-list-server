import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { ShowDto } from './show.dto';
import { ShowService } from './show.service';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  /* Get */
  @Get()
  async getShows(@Query('name') name: string) {
    return this.showService.getAll(name);
  }

  @Get('most-viewed')
  async getMostViewed() {
    return this.showService.getMostViewedShow();
  }

  @Get('highest-rated')
  async getHighestRated() {
    return this.showService.getHighestRatedShow();
  }

  @Get('last-added')
  async getLastAdded() {
    return this.showService.getLastAddedShow();
  }

  @Get('by-id:id')
  async getShowById(@Param('id') id: string) {
    return this.showService.byId(+id);
  }

  /* End Get */

  /* Post */
  @HttpCode(200)
  @Post('create')
  @Auth()
  async createShow() {
    return this.showService.create();
  }
  /* End Post */

  /* Put */
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update/:id')
  @Auth()
  async updateShow(@Param('id') id: string, @Body() dto: ShowDto) {
    return this.showService.update(+id, dto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put('update-views/:id')
  async updateViews(@Param('id') id: string) {
    return this.showService.updateCountViews(+id);
  }
  /* End Put */

  /* Delete */
  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('delete/:id')
  @Auth()
  async deleteShow(@Param('id') id: string) {
    return this.showService.delete(+id);
  }
  /* End Delete */
}
