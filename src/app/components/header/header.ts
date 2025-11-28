import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  public routes = [
    { id: 1, path: '/index', label: 'Index' },
    { id: 2, path: '/about', label: 'About' },
    { id: 3, path: '/archive', label: 'Archive' },
    { id: 4, path: '/contact', label: 'Contact' },
  ];
}
