import { Tenisman } from 'src/types/tenisman.type';
import { TenismanRepository } from '../repository/tenisman.repository';
import { TenismanService } from './tenisman.service';

describe('TenismanService', () => {
  let tenismanRepository: TenismanRepository;
  let tenismanService: TenismanService;

  beforeEach(() => {
    tenismanRepository = new TenismanRepository();
    tenismanService = new TenismanService(tenismanRepository);
  });

  describe('getAll', () => {
    it('should get all tenismans sorted by rank', () => {
      const mockedGetAll = jest.fn();
      tenismanRepository.getAllSortedBy = mockedGetAll;
      tenismanService.getAll();

      expect(mockedGetAll.mock.calls).toEqual([['data.rank']]);
    });
  });

  describe('getById', () => {
    it('should get one tenisman sorted by id', () => {
      const id = '123';
      const mockedGetAll = jest.fn();
      tenismanRepository.getBy = mockedGetAll;
      tenismanService.getById(id);

      expect(mockedGetAll.mock.calls).toEqual([['id', id]]);
    });
  });

  describe('getStats', () => {
    it('should get stats of all tenisman', () => {
      const countryWithBestWinRate = 'FRA';
      const averageIMC = '25.25';
      const medianHeight = 183;

      tenismanService.getCountryWithBestWinRate = jest.fn(
        () => countryWithBestWinRate,
      );
      tenismanService.getAverageIMC = jest.fn(() => averageIMC);
      tenismanService.getMedianHeight = jest.fn(() => medianHeight);
      const response = tenismanService.getStats();

      expect(response).toEqual({
        countryWithBestWinRate,
        averageIMC,
        medianHeight,
      });
    });
  });

  describe('getCountryWithBestWinRate', () => {
    it('should return the country with the best win rate', () => {
      const tenismans = [
        { country: { code: 'FRA' }, data: { last: [1, 1, 1, 1, 1] } },
        { country: { code: 'FRA' }, data: { last: [1, 1, 1, 1, 0] } },
        { country: { code: 'FRA' }, data: { last: [1, 1, 1, 1, 0] } },
        { country: { code: 'USA' }, data: { last: [0, 1, 1, 1, 1] } },
        { country: { code: 'USA' }, data: { last: [0, 1, 1, 1, 1] } },
      ];
      const response = tenismanService.getCountryWithBestWinRate(
        tenismans as Tenisman[],
      );

      expect(response).toBe('FRA');
    });
  });

  describe('computeIMC', () => {
    it('should compute tenisman IMC', () => {
      const tenisman = {
        data: {
          weight: 85000,
          height: 183,
        },
      };
      expect(tenismanService.computeIMC(tenisman as Tenisman)).toBe(
        25.381468541909282,
      );
    });
  });

  describe('getAverageIMC', () => {
    it('should get average IMG if given tenismans', () => {
      const tenismans = [
        {
          data: {
            weight: 85000,
            height: 183,
          },
        },
        {
          data: {
            weight: 80000,
            height: 181,
          },
        },
        {
          data: {
            weight: 70000,
            height: 182,
          },
        },
      ];
      const response = tenismanService.getAverageIMC(tenismans as Tenisman[]);

      expect(response).toBe('23.64');
    });
  });

  describe('getMedianHeightOfGivenTenismans', () => {
    it('should get height median of given sorted tenisman with odd length', () => {
      const tenismans = [
        {
          data: {
            height: 181,
          },
        },
        {
          data: {
            height: 182,
          },
        },
        {
          data: {
            height: 183,
          },
        },
      ];
      const response = tenismanService.getMedianHeightOfGivenTenismans(
        tenismans as Tenisman[],
      );

      expect(response).toBe(182);
    });
    it('should get height median of given sorted tenisman with even length', () => {
      const tenismans = [
        {
          data: {
            height: 181,
          },
        },
        {
          data: {
            height: 182,
          },
        },
        {
          data: {
            height: 183,
          },
        },
        {
          data: {
            height: 184,
          },
        },
        {
          data: {
            height: 185,
          },
        },
        {
          data: {
            height: 186,
          },
        },
      ];
      const response = tenismanService.getMedianHeightOfGivenTenismans(
        tenismans as Tenisman[],
      );

      expect(response).toBe(184);
    });
  });
});
