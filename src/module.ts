import { Module } from '@nestjs/common';
import { TennisPlayerRepository } from './repository/tennisPlayer.repository';
import { TennisPlayerService } from './service/tennisPlayer.service';
import { TennisPlayerController } from './controller/tennisPlayer.controller';

@Module({
  imports: [],
  controllers: [TennisPlayerController],
  providers: [TennisPlayerRepository, TennisPlayerService],
})
export class AppModule {}
