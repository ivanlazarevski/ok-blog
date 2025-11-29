import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { SanityService } from '../../../util/sanity.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BlogPost } from '../../../util/blog.types';
import { BlogPostCardComponent } from '../blog-post-card/blog-post-card.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'blog-page',
  imports: [BlogPostCardComponent],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css',
})
export class BlogPageComponent implements OnInit {
  private readonly sanity = inject(SanityService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  public posts = signal<BlogPost[]>([]);

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      const tag = params['tag'];
      if (tag) {
        return this.getPostsByTag(tag);
      }

      return this.getAllPosts();
    });
  }

  private getPostsByTag(tag: string) {
    this.sanity
      .getByTag(tag)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.posts.set(data);
        },
      });
  }

  private getAllPosts(): void {
    this.sanity
      .getAll('post')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.posts.set(data);
        },
      });
  }
}
