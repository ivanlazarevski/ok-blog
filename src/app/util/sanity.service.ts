import { Injectable } from '@angular/core';
import { createClient, SanityClient } from '@sanity/client';
import { Observable, from } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SanityService {
  private readonly client: SanityClient;

  constructor() {
    this.client = createClient({
      projectId: '205vlnet',
      dataset: 'production',
      useCdn: true,
    });
  }

  // Fetch all documents of a specific type
  getAll<T>(type: string): Observable<T[]> {
    const query = `*[_type == "${type}"]`;
    return from(this.client.fetch(query));
  }

  // Fetch a single document by ID
  getById<T>(id: string): Observable<T> {
    const query = `*[_id == "${id}"][0]`;
    return from(this.client.fetch(query));
  }

  // Custom GROQ query
  query<T>(groqQuery: string, params?: any): Observable<T> {
    return from(this.client.fetch(groqQuery, params));
  }
}
