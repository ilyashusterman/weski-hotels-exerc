import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  WsResponse,
} from '@nestjs/websockets';
import { map, Observable } from 'rxjs';
import { Server } from 'socket.io';
import { QueryBody } from './types';
import { SearchHotelAPIFactory } from './api.implementations/factory';

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

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class SearchHotelsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('search')
  findAll(@MessageBody() data: QueryBody): Observable<WsResponse<any>> {
    const factory = SearchHotelAPIFactory.create('HotelsSimulatorAPI', data);
    const results = factory.getResults();
    return observingResults(results).pipe(
      map((item) => ({ event: 'search-result', data: item })),
    );
  }
}
