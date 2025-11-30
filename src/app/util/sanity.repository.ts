import { Injectable, signal } from '@angular/core';
import { createClient, SanityClient } from '@sanity/client';
import { Observable, from, map } from 'rxjs';
import { BlogPost, TagCount } from './blog.types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SanityRepository {
  private readonly client: SanityClient;
  public lastId = signal<string | null>('');

  constructor() {
    this.client = createClient({
      projectId: environment.sanityProjectId,
      dataset: 'production',
      useCdn: true,
    });
  }

  getAll<T>(type: string): Observable<BlogPost[]> {
    const query = `*[_type == "${type}"]`;
    return from(this.client.fetch(query));
  }

  public getBySlug<T>(slug: string): Observable<BlogPost> {
    const query = `*[slug.current == "${slug}"][0]`;
    return from(this.client.fetch(query));
  }

  public getFirstFive(type: string): Observable<BlogPost[]> {
    const query = `*[_type == "${type}"] | order(_id) [0...5]`;
    return from(this.client.fetch(query));
  }

  public getByTag(tag: string): Observable<BlogPost[]> {
    const query = `*[_type == "post" && "${tag}" in tags]`;
    return from(this.client.fetch(query));
  }

  public getNextPage(): Observable<BlogPost[]> {
    if (this.lastId() === null) {
      return from([]);
    }

    const query = `*[_type == "post" && _id > $lastId] | order(_id) [0...5]`;
    return from(this.client.fetch<BlogPost[]>(query, { lastId: this.lastId() }));
  }

  getTagCounts(): Observable<TagCount[]> {
    const query = `*[_type == "post" && defined(tags)].tags[]`;

    return from(this.client.fetch<string[]>(query)).pipe(
      map((allTags) => {
        const tagCounts: TagCount[] = [];
        allTags.flat().forEach((tag) => {
          const existing = tagCounts.find((tc) => tc.tag === tag);
          if (existing) {
            existing.count++;
          } else {
            tagCounts.push({ tag, count: 1 });
          }
        });
        return tagCounts.sort((a, b) => b.count - a.count);
      }),
    );
  }
}
