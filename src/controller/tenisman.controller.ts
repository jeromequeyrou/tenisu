import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpException,
  UseFilters,
} from '@nestjs/common';
import { TenismanService } from 'src/service/tenisman.service';
import { HttpExceptionFilter } from 'src/exceptionFilter/httpExceptionFilter';
import { Tenisman } from 'src/types/tenisman.type';
import { TenismanStats } from 'src/types/tenismanStats.type';

@Controller('tenisman')
@UseFilters(new HttpExceptionFilter())
export class TenismanController {
  constructor(private readonly tenismanService: TenismanService) {}

  @Get()
  getAllTenisman(): Tenisman[] {
    return this.tenismanService.getAll();
  }

  @Get('stats')
  getTenismanStats(): TenismanStats {
    return this.tenismanService.getStats();
  }

  @Get(':id')
  getTenisman(@Param('id') id: string): Tenisman {
    const tenisman = this.tenismanService.getById(id);
    if (!tenisman)
      throw new HttpException(
        `Teniman with id ${id} does not exist.`,
        HttpStatus.NOT_FOUND,
      );
    return this.tenismanService.getById(id);
  }
}
