import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import Pusher from 'pusher-js';

import { environment } from '../environments/environment';
import { Feed } from './feed';


@Injectable({
  providedIn: 'root'
})

export class FeedService {
  private subject: Subject<Feed> = new Subject<Feed>();
  private pusherClient: Pusher;

  constructor() {
    this.pusherClient = new Pusher(environment.API_KEY, {
      cluster: environment.CLUSTER
    });

    const channel = this.pusherClient.subscribe('realtime-feeds');
    // const utc = (new Date().toJSON().slice(0, 10).replace(/-/g, '/')).toString();

    channel.bind(
      'posts',
      (data: {
        title: string;
        body: string;
        time: string;
      }) => {
        // this.subject.next(new Feed(data.title, data.body, new Date(data.time)));
        this.subject.next(new Feed(data.title, data.body, new Date(data.time)));
      }
    );
  }

  getFeedItems(): Observable<Feed> {
    return this.subject.asObservable();
  }
}
