import { Component, inject, OnInit, signal } from '@angular/core';
import { Tag } from '../../util/tag.type';
import { BlogCard } from '../../util/blog-card.type';
import { ButtonComponent } from '../../components/button.component/button.component';
import { BlogPostCardComponent } from '../blog/blog-post-card.component/blog-post-card.component';
import { RouterLink } from '@angular/router';
import { SanityService } from '../../util/sanity.service';

@Component({
  selector: 'home-page',
  imports: [ButtonComponent, BlogPostCardComponent, RouterLink],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent implements OnInit {
  ngOnInit(): void {
    this.sanity.getAll('post').subscribe((data) => {
      console.log(data);
    }, error => console.log(error))
  }

  public readonly sanity = inject(SanityService);
  public tempTags: Tag[] = [
    {
      id: 0,
      title: 'JavaScript',
      count: 3,
    },
    {
      title: 'TypeScript',
      count: 2,
      id: 1,
    },
    {
      id: 2,
      title: 'Angular',
      count: 1,
    },
    {
      id: 3,
      title: 'React',
      count: 4,
    },
  ];

  public tempPosts: BlogCard[] = [
    {
      id: 0,
      title: 'This is my first blog post',
      date: '2025-11-28',
      minRead: 10,
      text:
        'Since the post does not have a description in the frontmatter, ' +
        'the first paragraph is used. Learn how to use context managers and the with statement in Python for resource management. ' +
        'Explore the keyof operator and mapped types in TypeScript for advanced type manipulation.',
      tags: ['JavaScript', 'TypeScript'],
    },
  ];

  public tagsList = signal<Tag[]>(this.tempTags);
  public postsList = signal<BlogCard[]>(this.tempPosts);
}
