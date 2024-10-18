import { Injectable } from '@nestjs/common';
import { TennisPlayerRepository } from '../repository/tennisPlayer.repository';
import { TennisPlayer } from '../types/tennisPlayer.type';
import { TennisPlayerStats } from '../types/tennisPlayerStats.type';
import { groupBy } from 'lodash';
import { sumByArray } from '../utils/sumByArray';

@Injectable()
export class TennisPlayerService {
  constructor(
    private readonly tennisPlayerRepository: TennisPlayerRepository,
  ) {}

  getCountryWithBestWinRate(allPlayers: TennisPlayer[]): string {
    const groupByCountry = groupBy(allPlayers, 'country.code');

    let bestWinRate = 0;
    let countryWithBestWinRate = '';
    Object.entries(groupByCountry).forEach(
      ([countryCode, tennisPlayers]: [string, TennisPlayer[]]) => {
        const winRate =
          tennisPlayers.reduce(
            (acc, curr) => acc + sumByArray(curr.data.last),
            0,
          ) / tennisPlayers.length;
        if (winRate > bestWinRate) {
          bestWinRate = winRate;
          countryWithBestWinRate = countryCode;
        }
      },
    );
    return countryWithBestWinRate;
  }

  computeIMC(tennisPlayer: TennisPlayer) {
    return (
      tennisPlayer.data.weight /
      ((tennisPlayer.data.height * tennisPlayer.data.height) / 10)
    );
  }

  getAverageIMC(allPlayers: TennisPlayer[]): string {
    const allIMC = allPlayers.map(this.computeIMC);

    return (sumByArray(allIMC) / allPlayers.length).toFixed(2);
  }

  getMedianHeight(): number {
    const allPlayers =
      this.tennisPlayerRepository.getAllSortedBy('data.height');

    return this.getMedianHeightOfGivenTennisPlayers(allPlayers);
  }

  getMedianHeightOfGivenTennisPlayers(allPlayers: TennisPlayer[]): number {
    const half = Math.floor(allPlayers.length / 2);
    const index = half % 2 ? half : half - 1;
    return allPlayers[index].data.height;
  }

  getAll(): TennisPlayer[] {
    return this.tennisPlayerRepository.getAllSortedBy('data.rank');
  }

  getById(id: string): TennisPlayer {
    return this.tennisPlayerRepository.getBy('id', id);
  }

  getStats(): TennisPlayerStats {
    const allPlayers = this.getAll();

    return {
      countryWithBestWinRate: this.getCountryWithBestWinRate(allPlayers),
      averageIMC: this.getAverageIMC(allPlayers),
      medianHeight: this.getMedianHeight(),
    };
  }
}
