import { computed, Injectable, Signal, signal } from '@angular/core';
import { BlogPost } from './blog.types';

@Injectable({
  providedIn: 'root',
})
export class SanityStore {
  private _blogPosts = signal<BlogPost[]>([]);
  public blogPosts = this._blogPosts.asReadonly();
  public tagCounts = computed(() => {

  })

  public getAllBlogPosts(): Signal<BlogPost[]> {
    return this.blogPosts;
  }
  public setAllBlogPosts(blogPosts: BlogPost[]) {
    this._blogPosts.set(blogPosts);
  }

  public getBlogPostBySlug(slug: string): BlogPost | null {
    return this._blogPosts().find(post => post.slug.current === slug) ?? null;
  }

  public getFiveLatestPosts(): BlogPost[] {
    return this._blogPosts().slice(0, 4);
  }

  public getBlogPostsByTag(tag: string): BlogPost[] {
    return this._blogPosts().filter(blogPost => blogPost.tags.includes(tag));
  }
}
