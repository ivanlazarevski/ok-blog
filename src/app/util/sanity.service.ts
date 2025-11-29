import { Injectable, signal } from '@angular/core';
import { createClient, SanityClient } from '@sanity/client';
import { Observable, from, map } from 'rxjs';
import { BlogPost, TagCount } from './blog.types';

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  private readonly client: SanityClient;
  public lastId = signal<string>("");

  constructor() {
    this.client = createClient({
      projectId: '205vlnet',
      dataset: 'production',
      useCdn: true,
    });
  }

  getAll<T>(type: string): Observable<BlogPost[]> {
    const query = `*[_type == "${type}"]`;
    return from(this.client.fetch(query));
  }

  public getById<T>(id: string): Observable<BlogPost> {
    const query = `*[_id == "${id}"][0]`;
    return from(this.client.fetch(query));
  }

  public getBySlug<T>(slug: string): Observable<BlogPost> {
    console.log(slug);
    const query = `*[slug.current == "${slug}"][0]`;
    return from(this.client.fetch(query));
  }

  public getFirstFive(type: string): Observable<BlogPost[]> {
    const query = `*[_type == "${type}"] | order(_id) [0...5]`;
    return from(this.client.fetch(query));
  }

  public getNextPage(type: string) {
    if(!this.lastId()) {
      return [];
    }

    const query = `*[_type == "${type}" ** _id > $${this.lastId()}] | order(_id [0...5]`;
    return from(this.client.fetch(query));
  }

  getTagCounts(): Observable<TagCount[]> {
    const query = `*[_type == "post" && defined(tags)].tags[]`;

    return from(this.client.fetch<string[]>(query)).pipe(
      map(allTags => {
        const tagCounts: TagCount[] = [];
        allTags.flat().forEach(tag => {
          const existing = tagCounts.find(tc => tc.tag === tag);
          if (existing) {
            existing.count++;
          } else {
            tagCounts.push({ tag, count: 1 });
          }
        });
        return tagCounts.sort((a, b) => b.count - a.count);
      })
    );
  }
}
