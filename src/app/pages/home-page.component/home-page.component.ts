import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ButtonComponent } from '../../components/button.component/button.component';
import { BlogPostCardComponent } from '../blog/blog-post-card.component/blog-post-card.component';
import { RouterLink } from '@angular/router';
import { SanityService } from '../../util/sanity.service';
import { BlogPost, TagCount } from '../../util/blog.types';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'home-page',
  imports: [ButtonComponent, BlogPostCardComponent, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  public readonly sanity = inject(SanityService);
  public readonly destroyRef = inject(DestroyRef);

  public tagsList = signal<TagCount[]>([]);
  public postsList = signal<BlogPost[]>([]);

  ngOnInit(): void {
    this.sanity
      .getFirstFive('post')
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (data) => {
          console.log(data);
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
}
