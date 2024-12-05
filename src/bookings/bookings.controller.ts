import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
  Request,
  Get,
  Param,
} from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { BookingData } from './types';

@Controller('bookings')
export class BookingsController {
  constructor(private readonly bookingsService: BookingsService) {}

  @UseGuards(AuthGuard)
  @Post('/book-ticket')
  @HttpCode(HttpStatus.CREATED)
  async bookTicket(@Body() bookingData: BookingData, @Request() req) {
    console.log(bookingData);
    console.log(req.user);
    return await this.bookingsService.addBooking(bookingData, req.user);
  }

  @UseGuards(AuthGuard)
  @Get('/:id')
  async getBooking(@Param('id') id: string, @Request() req) {
    return await this.bookingsService.getBooking(id, req.user);
  }
}
