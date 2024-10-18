import {
  Controller,
  Get,
  Param,
  HttpStatus,
  HttpException,
  UseFilters,
} from '@nestjs/common';
import { TennisPlayerService } from 'src/service/tennisPlayer.service';
import { HttpExceptionFilter } from 'src/exceptionFilter/httpExceptionFilter';
import { TennisPlayer } from 'src/types/tennisPlayer.type';
import { TennisPlayerStats } from 'src/types/tennisPlayerStats.type';

@Controller('tennisPlayer')
@UseFilters(new HttpExceptionFilter())
export class TennisPlayerController {
  constructor(private readonly tennisPlayerService: TennisPlayerService) {}

  @Get()
  getAllTennisPlayer(): TennisPlayer[] {
    return this.tennisPlayerService.getAll();
  }

  @Get('stats')
  getTennisPlayerStats(): TennisPlayerStats {
    return this.tennisPlayerService.getStats();
  }

  @Get(':id')
  getTennisPlayer(@Param('id') id: string): TennisPlayer {
    const tennisPlayer = this.tennisPlayerService.getById(id);
    if (!tennisPlayer)
      throw new HttpException(
        `Teniman with id ${id} does not exist.`,
        HttpStatus.NOT_FOUND,
      );
    return this.tennisPlayerService.getById(id);
  }
}
