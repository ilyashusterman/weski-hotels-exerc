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
      setTimeout(async () => {
        const data = await promiseResult;
        count += 1;
        subscriber.next(data);
      }, 0);
    });
    let intervalId = null;
    intervalId = setInterval(() => {
      if (count === results.length) {
        subscriber.complete();
        clearInterval(intervalId);
      }
    }, 5000);
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
