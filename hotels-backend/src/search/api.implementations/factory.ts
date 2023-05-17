import { QueryBody } from '../types';
import { HotelsSimulatorAPI } from './hotels.simulator';
import { SearchHotelAPI } from './types';

export class SearchHotelAPIFactory {
  static create(name: string, query: QueryBody): SearchHotelAPI {
    switch (name) {
      case 'HotelsSimulatorAPI':
        return new HotelsSimulatorAPI(query);
      // add more cases for other API types here
      default:
        throw new Error(`Unsupported API type: ${name}`);
    }
  }
}
