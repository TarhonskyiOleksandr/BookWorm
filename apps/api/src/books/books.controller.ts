import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('books')
export class BooksController {
  @UseGuards(JwtAuthGuard)
  @Get('/popular')
  getAllPopularBooks() {
    return [];
  }
}
