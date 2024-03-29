import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { flatMap } from 'lodash-es';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { RedditResult } from '../interfaces/result';

@Injectable({
  providedIn: 'root',
})
export class RedditImageSearchService {
  constructor(private http: HttpClient) {}

  search(subReddit: string, search: string): Observable<RedditResult[]> {
    const url =
      'https://www.reddit.com/r/' +
      subReddit +
      '/search.json?restrict_sr=on&q=' +
      search;
    const searchResults = this.http
      .get<any[]>(url)
      .pipe(map(translateRedditResults));
    console.log('search results: ', searchResults.subscribe(x => console.log(x)));
    return searchResults;
  }
}

function translateRedditResults(items: any): RedditResult[] {
  // This function doesn't know anything about HTTP or Observable; it just
  // manages the messy shape of this API's data return layout.
  console.log('search result items: ', items);
  return flatMap(
    items.data.children,
    (item: Record<string, string>): RedditResult[] => {
      if (item) {
        const data = item['data'];
        if (data) {
          const thumbnail = data['thumbnail'];
          const title = data['title'];
          if (thumbnail.startsWith('https')) {
            return [{ thumbnail, title }];
          }
        }
      }
      return [];
    }
  );
}
