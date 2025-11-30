import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type CommentData = {
  email: string | null | undefined,
  message: string | null | undefined;
  'g-recaptcha-response': any;
}

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  private readonly http = inject(HttpClient);
  private readonly formSpreeUrl = environment.formSpreeUrl;

  public postComment(commentData: CommentData): Observable<Object> {
    return this.http.post(`https://formspree.io/f/${this.formSpreeUrl}`, {
      email: commentData.email,
      message: commentData.message,
      'g-recaptcha-response': commentData['g-recaptcha-response']
    });
  }
}
