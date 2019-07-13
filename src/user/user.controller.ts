import { Controller, Get, Post, Body, UsePipes, UseGuards, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from './user.dto';
import { ValidationPipe } from '../shared/validation.pipe';
import { AuthGuard } from '../shared/auth.gaurd';
import { User } from './user.decorator';
import { UserEntity } from './user.entity';

@Controller()
export class UserController {
  constructor(private userService: UserService) {

  }

  @Get('api/users')
  // @UseGuards(new AuthGuard())
  async showAllUsers(
    @User() user) {
    await this.userService.showAll();
    return this.userService.showAll();
  }

  @Post('login')
  @UsePipes(new ValidationPipe())
  login(@Body() data: UserDTO) {
    return this.userService.login(data);
  }

  @Post('register')
  @UsePipes(new ValidationPipe())
  register(@Body() data: UserDTO) {
    return this.userService.register(data);
  }
}
