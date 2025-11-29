import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { switchMap, take } from 'rxjs';
import { SanityService } from '../../../util/sanity.service';

@Component({
  selector: 'blog-page-post',
  imports: [],
  templateUrl: './blog-page-post.component.html',
  styleUrl: './blog-page-post.component.css',
})
export class BlogPagePostComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly sanity = inject(SanityService);
  private readonly destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.activatedRoute
      .params
      .pipe(
        switchMap((params: Params) =>
          this.sanity.getBySlug(params['id'])
        ),
        takeUntilDestroyed(this.destroyRef),
      take(1),
      )
      .subscribe(data => {
        console.log(data);
    })
  }
}
