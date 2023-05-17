import { Test, TestingModule } from '@nestjs/testing';
import { reduce } from 'rxjs/operators';
import { SearchHotelsGateway } from './search.hotels.gateway';

describe('SearchHotelsGateway', () => {
  let gateway: SearchHotelsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SearchHotelsGateway],
    }).compile();

    gateway = module.get<SearchHotelsGateway>(SearchHotelsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  describe('findAll', () => {
    test('should return 3 responses', (done) => {
      gateway
        .findAll({
          ski_site: 1,
          from_date: '03/04/2024',
          to_date: '03/11/2024',
          group_size: 2,
        })
        .pipe(
          reduce((acc, item) => {
            return [...acc, item];
          }, []),
        )
        .subscribe((results) => {
          expect(results.length).toBe(3);
          results.forEach((result, index) =>
            expect(result.data).toBe(index + 1),
          );
          done();
        });
    });
  });
});
