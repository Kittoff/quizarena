import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('identify')
  identify(@Body('username') username: string) {
    return this.usersService.identify(username);
  }
}
