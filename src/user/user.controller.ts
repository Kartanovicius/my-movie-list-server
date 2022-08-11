import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from './user.decorator';
import { UserDto } from './user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @Auth()
  async getProfile(@CurrentUser('id') id: number) {
    return this.userService.byId(id);
  }

  @Get('by-id/:id')
  @Auth()
  async getUser(@Param('id') id: string) {
    return this.userService.byId(+id);
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Put(':id')
  @Auth()
  async updateUser(@Param('id') id: string, @Body() dto: UserDto) {
    return this.userService.userUpdate(+id, dto);
  }

  @Get('')
  async getUsers() {
    return this.userService.getAll();
  }
}
