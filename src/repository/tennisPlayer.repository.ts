import { Injectable } from '@nestjs/common';
import data from '../data/headtohead';
import { TennisPlayer } from 'src/types/tennisPlayer.type';
import { sortBy, get } from 'lodash';

@Injectable()
export class TennisPlayerRepository {
  getAll(): TennisPlayer[] {
    return data.players;
  }

  getAllSortedBy(field: string): TennisPlayer[] {
    return sortBy(this.getAll(), field);
  }

  getBy(field: string, value): TennisPlayer {
    return this.getAll().find((e) => `${get(e, field)}` === value);
  }
}
