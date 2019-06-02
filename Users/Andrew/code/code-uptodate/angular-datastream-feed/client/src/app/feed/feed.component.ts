import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { FeedService } from '../feed.service';
import { Feed } from '../feed';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
  providers: [FeedService],
})
export class FeedComponent implements OnInit, OnDestroy {
  public feeds: Feed[] = [];

  private feedSubscription: Subscription;

  // take dependency on FeedService and subscribe to an observable to get its getFeedItems method.
  // Every time a new Feed item is resolved from the subscription it is added to the existing list of feeds.
  constructor(private feedService: FeedService) {
    this.feedSubscription = feedService
      .getFeedItems()
      .subscribe((feed: Feed) => {
        this.feeds.push(feed);
      });
  }

  ngOnInit() {
  }

  // unsubscribe from the observable.
  ngOnDestroy() {
    this.feedSubscription.unsubscribe();
  }

}
