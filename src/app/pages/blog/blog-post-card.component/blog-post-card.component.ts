import { Component, input } from '@angular/core';
import { BlogCard } from '../../../util/blog-card.type';
import { ButtonComponent } from '../../../components/button.component/button.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'blog-post-card',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './blog-post-card.component.html',
  styleUrl: './blog-post-card.component.css',
})
export class BlogPostCardComponent {
  post = input.required<BlogCard>();
}
