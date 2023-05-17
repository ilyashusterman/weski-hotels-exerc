import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { map, Observable } from 'rxjs';
import { Server } from 'socket.io';
import { QueryBodyRaw, QueryBody } from './types';
import { SearchHotelAPIFactory } from './api.implementations/factory';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SearchHotelsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('search')
  findAll(@MessageBody() data: QueryBodyRaw): Observable<WsResponse<any>> {
    const query: QueryBody = {
      group_size: parseInt(data.group_size),
      ski_site: parseInt(data.ski_site),
      to_date: data.to_date,
      from_date: data.from_date,
    };
    const factory = SearchHotelAPIFactory.create('HotelsSimulatorAPI', query);
    const results = factory.getResults();
    return observingResults(results).pipe(
      map((item) => ({ event: 'search-result', data: item })),
    );
  }
}

export function observingResults(
  results: Array<PromiseLike<any>>,
): Observable<unknown> {
  return new Observable((subscriber) => {
    let count = 0;
    results.map((promiseResult) => {
      promiseResult.then((data) => {
        count += 1;
        subscriber.next(data);
        if (count === results.length) {
          subscriber.complete();
        }
      });
    });
  });
}
