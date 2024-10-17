import { Injectable } from '@nestjs/common';
import data from '../data/headtohead';
import { Tenisman } from 'src/types/tenisman.type';
import { sortBy, get } from 'lodash';

@Injectable()
export class TenismanRepository {
  getAll(): Tenisman[] {
    return data.players;
  }

  getAllSortedBy(field: string): Tenisman[] {
    return sortBy(this.getAll(), field);
  }

  getBy(field: string, value): Tenisman {
    return this.getAll().find((e) => `${get(e, field)}` === value);
  }
}
