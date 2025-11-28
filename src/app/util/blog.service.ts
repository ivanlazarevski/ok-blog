import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private readonly http = inject(HttpClient);

  public postComment(
    email: string | null | undefined,
    message: string | null | undefined,
  ): Observable<Object> {
    return this.http.post('https://formspree.io/f/xwpwvvov', {
      email,
      message,
    });
  }
}
