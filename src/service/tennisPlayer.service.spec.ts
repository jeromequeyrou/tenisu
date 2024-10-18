import { TennisPlayer } from 'src/types/tennisPlayer.type';
import { TennisPlayerRepository } from '../repository/tennisPlayer.repository';
import { TennisPlayerService } from './tennisPlayer.service';

describe('TennisPlayerService', () => {
  let tennisPlayerRepository: TennisPlayerRepository;
  let tennisPlayerService: TennisPlayerService;

  beforeEach(() => {
    tennisPlayerRepository = new TennisPlayerRepository();
    tennisPlayerService = new TennisPlayerService(tennisPlayerRepository);
  });

  describe('getAll', () => {
    it('should get all tennisPlayers sorted by rank', () => {
      const mockedGetAll = jest.fn();
      tennisPlayerRepository.getAllSortedBy = mockedGetAll;
      tennisPlayerService.getAll();

      expect(mockedGetAll.mock.calls).toEqual([['data.rank']]);
    });
  });

  describe('getById', () => {
    it('should get one tennisPlayer sorted by id', () => {
      const id = '123';
      const mockedGetAll = jest.fn();
      tennisPlayerRepository.getBy = mockedGetAll;
      tennisPlayerService.getById(id);

      expect(mockedGetAll.mock.calls).toEqual([['id', id]]);
    });
  });

  describe('getStats', () => {
    it('should get stats of all tennisPlayer', () => {
      const countryWithBestWinRate = 'FRA';
      const averageIMC = '25.25';
      const medianHeight = 183;

      tennisPlayerService.getCountryWithBestWinRate = jest.fn(
        () => countryWithBestWinRate,
      );
      tennisPlayerService.getAverageIMC = jest.fn(() => averageIMC);
      tennisPlayerService.getMedianHeight = jest.fn(() => medianHeight);
      const response = tennisPlayerService.getStats();

      expect(response).toEqual({
        countryWithBestWinRate,
        averageIMC,
        medianHeight,
      });
    });
  });

  describe('getCountryWithBestWinRate', () => {
    it('should return the country with the best win rate', () => {
      const tennisPlayers = [
        { country: { code: 'FRA' }, data: { last: [1, 1, 1, 1, 1] } },
        { country: { code: 'FRA' }, data: { last: [1, 1, 1, 1, 0] } },
        { country: { code: 'FRA' }, data: { last: [1, 1, 1, 1, 0] } },
        { country: { code: 'USA' }, data: { last: [0, 1, 1, 1, 1] } },
        { country: { code: 'USA' }, data: { last: [0, 1, 1, 1, 1] } },
      ];
      const response = tennisPlayerService.getCountryWithBestWinRate(
        tennisPlayers as TennisPlayer[],
      );

      expect(response).toBe('FRA');
    });
  });

  describe('computeIMC', () => {
    it('should compute tennisPlayer IMC', () => {
      const tennisPlayer = {
        data: {
          weight: 85000,
          height: 183,
        },
      };
      expect(tennisPlayerService.computeIMC(tennisPlayer as TennisPlayer)).toBe(
        25.381468541909282,
      );
    });
  });

  describe('getAverageIMC', () => {
    it('should get average IMG if given tennisPlayers', () => {
      const tennisPlayers = [
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
      const response = tennisPlayerService.getAverageIMC(
        tennisPlayers as TennisPlayer[],
      );

      expect(response).toBe('23.64');
    });
  });

  describe('getMedianHeightOfGivenTennisPlayers', () => {
    it('should get height median of given sorted tennisPlayer with odd length', () => {
      const tennisPlayers = [
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
      const response = tennisPlayerService.getMedianHeightOfGivenTennisPlayers(
        tennisPlayers as TennisPlayer[],
      );

      expect(response).toBe(182);
    });
    it('should get height median of given sorted tennisPlayer with even length', () => {
      const tennisPlayers = [
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
      const response = tennisPlayerService.getMedianHeightOfGivenTennisPlayers(
        tennisPlayers as TennisPlayer[],
      );

      expect(response).toBe(184);
    });
  });
});
