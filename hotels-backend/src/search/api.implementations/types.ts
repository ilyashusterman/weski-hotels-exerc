import { QueryBody } from '../types';

export abstract class SearchHotelAPI {
  url: string;
  protected query: QueryBody;
  constructor(query: QueryBody) {
    this.query = query;
  }
  abstract getResults(): Array<PromiseLike<any>>;
}
