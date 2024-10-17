import { Injectable } from '@nestjs/common';
import { TenismanRepository } from '../repository/tenisman.repository';
import { Tenisman } from '../types/tenisman.type';
import { TenismanStats } from '../types/tenismanStats.type';
import { groupBy } from 'lodash';
import { sumByArray } from '../utils/sumByArray';

@Injectable()
export class TenismanService {
  constructor(private readonly tenismanRepository: TenismanRepository) {}

  getCountryWithBestWinRate(allPlayers: Tenisman[]): string {
    const groupByCountry = groupBy(allPlayers, 'country.code');

    let bestWinRate = 0;
    let countryWithBestWinRate = '';
    Object.entries(groupByCountry).forEach(
      ([countryCode, tenismans]: [string, Tenisman[]]) => {
        const winRate =
          tenismans.reduce((acc, curr) => acc + sumByArray(curr.data.last), 0) /
          tenismans.length;
        if (winRate > bestWinRate) {
          bestWinRate = winRate;
          countryWithBestWinRate = countryCode;
        }
      },
    );
    return countryWithBestWinRate;
  }

  computeIMC(tenisman: Tenisman) {
    return (
      tenisman.data.weight /
      ((tenisman.data.height * tenisman.data.height) / 10)
    );
  }

  getAverageIMC(allPlayers: Tenisman[]): string {
    const allIMC = allPlayers.map(this.computeIMC);

    return (sumByArray(allIMC) / allPlayers.length).toFixed(2);
  }

  getMedianHeight(): number {
    const allPlayers = this.tenismanRepository.getAllSortedBy('data.height');

    return this.getMedianHeightOfGivenTenismans(allPlayers);
  }

  getMedianHeightOfGivenTenismans(allPlayers: Tenisman[]): number {
    const half = Math.floor(allPlayers.length / 2);
    const index = half % 2 ? half : half - 1;
    return allPlayers[index].data.height;
  }

  getAll(): Tenisman[] {
    return this.tenismanRepository.getAllSortedBy('data.rank');
  }

  getById(id: string): Tenisman {
    return this.tenismanRepository.getBy('id', id);
  }

  getStats(): TenismanStats {
    const allPlayers = this.getAll();

    return {
      countryWithBestWinRate: this.getCountryWithBestWinRate(allPlayers),
      averageIMC: this.getAverageIMC(allPlayers),
      medianHeight: this.getMedianHeight(),
    };
  }
}
