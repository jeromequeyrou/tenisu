import { TenismanRepository } from './tenisman.repository';
import data from '../data/headtohead';

describe('TenismanRepository', () => {
  let tenismanRepository: TenismanRepository;

  beforeAll(() => {
    tenismanRepository = new TenismanRepository();
  });

  describe('getAll', () => {
    it('should return all tenisman', () => {
      const response = tenismanRepository.getAll();
      expect(response).toBe(data.players);
    });
  });

  describe('getAllSortedBy', () => {
    it('should return all tenisman sorted by rank', () => {
      const response = tenismanRepository.getAllSortedBy('data.rank');
      let prevRank = -1;

      for (const tenisman of response) {
        expect(prevRank <= tenisman.data.rank).toBeTruthy();
        prevRank = tenisman.data.rank;
      }
    });
  });

  describe('getBy', () => {
    it('should return one tenisman by id', () => {
      const response = tenismanRepository.getBy('id', '52');
      expect(response.id).toBe(52);
    });

    it('should return one tenisman by firstname', () => {
      const response = tenismanRepository.getBy('firstname', 'Venus');
      expect(response.firstname).toBe('Venus');
    });

    it('should return undefined when nothing is founded', () => {
      const response = tenismanRepository.getBy('firstname', 'blala');
      expect(response).toBe(undefined);
    });
  });
});
