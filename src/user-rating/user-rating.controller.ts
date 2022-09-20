import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from 'src/user/user.decorator';
import { CreateUserRatingDto } from './dto/create-user-rating.dto';
import { UpdateUserRatingDto } from './dto/update-user-rating.dto';
import { UserRatingService } from './user-rating.service';

@Controller('user-rating')
export class UserRatingController {
  constructor(private readonly userRatingService: UserRatingService) {}

  @UsePipes(new ValidationPipe())
  @Post('/create')
  @HttpCode(200)
  @Auth()
  create(
    @Body() createUserRatingDto: CreateUserRatingDto,
    @CurrentUser('id') userId?: number,
  ) {
    return this.userRatingService.create(createUserRatingDto, userId);
  }

  @Get()
  findAll() {
    return this.userRatingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userRatingService.findOne(+id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Patch('update/:id')
  update(
    @Param('id') id: string,
    @Body() updateUserRatingDto: UpdateUserRatingDto,
  ) {
    return this.userRatingService.update(+id, updateUserRatingDto);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Delete('delete/:id')
  @Auth()
  remove(@Param('id') id: string, @CurrentUser('role') userRole: string) {
    return this.userRatingService.remove(+id, userRole);
  }
}
