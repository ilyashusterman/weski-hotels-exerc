import axios from 'axios';
import { QueryBody } from '../types';
import { SearchHotelAPI } from './types';

const URL =
  'https://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator';
export class HotelsSimulatorAPI extends SearchHotelAPI {
  public url =
    'http://gya7b1xubh.execute-api.eu-west-2.amazonaws.com/default/HotelsSimulator';
  public groupSizes: number[] = [0, 1, 2];

  getResults(): Array<PromiseLike<any>> {
    return this.groupSizes.map((size) => this.getNextGroupSize(size));
  }
  getNextGroupSize(groupSize: number): Promise<any> {
    const sizeQuery: QueryBody = {
      ...this.query,
      group_size: groupSize + this.query.group_size,
    };
    return this.getApi(sizeQuery);
  }

  getApi(queryBody: QueryBody): Promise<any> {
    return axios
      .post(
        URL,
        {
          query: queryBody,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then((response) => {
        return response.data.body.accommodations;
      })
      .catch((error) => {
        console.error(error);
        return {};
      });
  }
}
