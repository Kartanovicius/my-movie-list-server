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
import { CurrentUser } from 'src/user/user.decorator';
import { ShowDto } from './show.dto';
import { ShowService } from './show.service';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  /* Get */
  @Get()
  async getShows(
    @Query('name') name: string,
    @Query('page') page: number,
    @Query('per-page') perPage: number,
    @Query('order') order: 'DESC' | 'ASC',
    @Query('genre') genre: string[],
  ) {
    return this.showService.getAll(name, perPage, page, order, genre);
  }

  @Get('most-viewed')
  async getMostViewed(
    @Query('page') page: number,
    @Query('per-page') perPage: number,
    @Query('order') order: 'DESC' | 'ASC',
    @Query('genre') genre?: string[],
  ) {
    return this.showService.getMostViewedShow(perPage, page, order, genre);
  }

  @Get('highest-rated')
  async getHighestRated(
    @Query('page') page: number,
    @Query('per-page') perPage: number,
    @Query('order') order: 'DESC' | 'ASC',
    @Query('genre') genre?: string[],
  ) {
    return this.showService.getHighestRatedShow(perPage, page, order, genre);
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
  async deleteShow(
    @Param('id') id: string,
    @CurrentUser('role') userRole: string,
  ) {
    return this.showService.delete(+id, userRole);
  }
  /* End Delete */
}
