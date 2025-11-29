import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, take } from 'rxjs';
import { SanityService } from '../../../util/sanity.service';
import { PortableTextDisplayComponent } from '../../../components/portable-text-display/portable-text-display.component';
import { BlogPost } from '../../../util/blog.types';

@Component({
  selector: 'blog-page-post',
  imports: [PortableTextDisplayComponent],
  templateUrl: './blog-page-post.component.html',
  styleUrl: './blog-page-post.component.css',
})
export class BlogPagePostComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly sanity = inject(SanityService);
  private readonly destroyRef = inject(DestroyRef);

  public blogPost = signal<BlogPost | null>(null);

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap((params: Params) => this.sanity.getBySlug(params['id'])),
        takeUntilDestroyed(this.destroyRef),
        take(1),
      )
      .subscribe((data) => {
        this.blogPost.set(data);
      });
  }
}
