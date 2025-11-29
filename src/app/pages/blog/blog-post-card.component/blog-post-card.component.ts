import { Component, input } from '@angular/core';
import { ButtonComponent } from '../../../components/button.component/button.component';
import { RouterLink } from '@angular/router';
import { BlogPost } from '../../../util/blog.types';

@Component({
  selector: 'blog-post-card',
  imports: [ButtonComponent, RouterLink],
  templateUrl: './blog-post-card.component.html',
  styleUrl: './blog-post-card.component.css',
})
export class BlogPostCardComponent {
  post = input.required<BlogPost>();
}
