import { Test, TestingModule } from '@nestjs/testing';
import { HotelAdminResolver } from './hotel.resolver';

describe('HotelResolver', () => {
  let resolver: HotelAdminResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HotelAdminResolver],
    }).compile();

    resolver = module.get<HotelAdminResolver>(HotelAdminResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
