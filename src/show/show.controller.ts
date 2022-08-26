import { Controller, Get } from '@nestjs/common';
import { ShowService } from './show.service';

@Controller('show')
export class ShowController {
  constructor(private readonly showService: ShowService) {}

  /* Get */
  @Get()
  async getShows() {
    return this.showService.getAll();
  }
  /* End Get */
}
