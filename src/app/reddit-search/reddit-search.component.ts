import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, combineLatest } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  retry,
  startWith,
  switchMap,
  tap
} from 'rxjs/operators';
import { RedditResult } from '../interfaces/result';

import { LogService } from '../loggers/log.service';
import {
  RedditImageSearchService
} from '../services/reddit-search.service';

@Component({
  selector: 'reddit-search',
  templateUrl: './reddit-search.component.html',
  styleUrls: ['./reddit-search.component.css']
})
export class RedditSearchComponent {
  subReddits = [
    'aww',
    'wholesomememes',
    'mildlyinteresting',
    'awesome'
  ];
  subReddit = new FormControl(this.subReddits[0]);
  search = new FormControl('');
  results: Observable<RedditResult[]>;

  constructor(
    ris: RedditImageSearchService,
    private logger: LogService
  ) {

    // start with a default 'aww' value
    const validSubReddit = this.subReddit.valueChanges.pipe(
      startWith<string>(this.subReddit.value as string)
    );

    // there is no initial search value, awaiting user input
    const validSearch = this.search.valueChanges.pipe(
      startWith<string>(this.search.value as string),
      map(search => search.trim()),
      debounceTime(200),
      distinctUntilChanged(),
      filter(search => search !== '')
    );

    // combineLatest is a Creation Operator - combine the above 2 observables
    this.results = combineLatest([validSubReddit, validSearch]).pipe(
      // This logs the user's intended search
      tap(search => this.logger.log('Search for: ' + search)),
      // take an input observable, return a different observable
      switchMap(([subReddit, search]) =>
        ris.search(subReddit, search).pipe(
          retry(3),
          // Clear previous entries while waiting
          startWith([])
        )
      )
    );
  }
}
