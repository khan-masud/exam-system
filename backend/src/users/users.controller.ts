import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get(':id/profile')
  getProfile(@Param('id') id: string) {
    return this.usersService.getPublicProfile(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/block')
  block(@Param('id') id: string, @Body() body: { scope: string; reason: string; expiresAt?: Date }) {
    return this.usersService.blockUser(id, body.scope, body.reason, body.expiresAt);
  }

  @UseGuards(JwtAuthGuard)
  @Post(':id/unblock')
  unblock(@Body('blockId') blockId: string) {
    return this.usersService.unblockUser(blockId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/roles')
  assignRole(@Param('id') id: string, @Body('role') role: string) {
    return this.usersService.assignRole(id, role);
  }
}
