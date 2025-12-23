import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { SanityRepository } from '../../../util/sanity.repository';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BlogPost } from '../../../util/blog.types';
import { BlogPostCardComponent } from '../blog-post-card/blog-post-card.component';
import { ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../../../components/button/button.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'blog-page',
  imports: [BlogPostCardComponent, ButtonComponent],
  templateUrl: './blog-page.component.html',
  styleUrl: './blog-page.component.css',
})
export class BlogPageComponent implements OnInit {
  private readonly sanity = inject(SanityRepository);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly destroyRef = inject(DestroyRef);

  public posts = signal<BlogPost[]>([]);
  public lastId = this.sanity.lastId;
  private readonly snackBar = inject(MatSnackBar);


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
          if (data.length > 0) {
            const id = data[data.length - 1]._id;
            this.sanity.lastId.set(id);
          } else {
            this.sanity.lastId.set(null);
          }
          this.posts.set(data);
        },
      });
  }

  public getNextPage(): void {
    this.sanity
      .getNextPage()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((data) => {
        if (data.length > 0) {
          const id = data[data.length - 1]._id;
          this.sanity.lastId.set(id);
        } else {
          this.sanity.lastId.set(null);
          this.snackBar.open("😭 No more posts!", "Okay!", {
            duration: 1500,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
            politeness: 'polite'
          })
        }
        this.posts.update((items) => [...items, ...data]);
      });
  }
}
