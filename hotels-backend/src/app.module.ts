import { Module } from '@nestjs/common';
import { SearchHotels } from './search/search.hotels.module';

@Module({
  imports: [SearchHotels],
  controllers: [],
  providers: [],
})
export class AppModule {}
