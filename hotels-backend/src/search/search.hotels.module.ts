import { Module } from '@nestjs/common';
import { SearchHotelsGateway } from './search.hotels.gateway';

@Module({
  providers: [SearchHotelsGateway],
})
export class SearchHotels {}
