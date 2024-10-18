import { TennisPlayerRepository } from './tennisPlayer.repository';
import data from '../data/headtohead';

describe('TennisPlayerRepository', () => {
  let tennisPlayerRepository: TennisPlayerRepository;

  beforeAll(() => {
    tennisPlayerRepository = new TennisPlayerRepository();
  });

  describe('getAll', () => {
    it('should return all tennisPlayer', () => {
      const response = tennisPlayerRepository.getAll();
      expect(response).toBe(data.players);
    });
  });

  describe('getAllSortedBy', () => {
    it('should return all tennisPlayer sorted by rank', () => {
      const response = tennisPlayerRepository.getAllSortedBy('data.rank');
      let prevRank = -1;

      for (const tennisPlayer of response) {
        expect(prevRank <= tennisPlayer.data.rank).toBeTruthy();
        prevRank = tennisPlayer.data.rank;
      }
    });
  });

  describe('getBy', () => {
    it('should return one tennisPlayer by id', () => {
      const response = tennisPlayerRepository.getBy('id', '52');
      expect(response.id).toBe(52);
    });

    it('should return one tennisPlayer by firstname', () => {
      const response = tennisPlayerRepository.getBy('firstname', 'Venus');
      expect(response.firstname).toBe('Venus');
    });

    it('should return undefined when nothing is founded', () => {
      const response = tennisPlayerRepository.getBy('firstname', 'blala');
      expect(response).toBe(undefined);
    });
  });
});
