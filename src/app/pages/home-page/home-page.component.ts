import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { BlogPostCardComponent } from '../blog/blog-post-card/blog-post-card.component';
import { Router, RouterLink } from '@angular/router';
import { SanityRepository } from '../../util/sanity.repository';
import { BlogPost, TagCount } from '../../util/blog.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'home-page',
  imports: [ButtonComponent, BlogPostCardComponent, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  public readonly sanity = inject(SanityRepository);
  public readonly router = inject(Router);
  public readonly destroyRef = inject(DestroyRef);

  public tagsList = signal<TagCount[]>([]);
  public postsList = signal<BlogPost[]>([]);

  ngOnInit(): void {
    this.sanity
      .getFirstFive('post')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.postsList.set(data);
        },
      });

    this.sanity
      .getTagCounts()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          this.tagsList.set(data);
        }
      })
  }

  navigateToTag(tag: string) {
    this.router.navigate(['/archive'], {
      queryParams: { tag }
    });
  }
}
