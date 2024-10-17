import { Module } from '@nestjs/common';
import { TenismanRepository } from './repository/tenisman.repository';
import { TenismanService } from './service/tenisman.service';
import { TenismanController } from './controller/tenisman.controller';

@Module({
  imports: [],
  controllers: [TenismanController],
  providers: [TenismanRepository, TenismanService],
})
export class AppModule {}
