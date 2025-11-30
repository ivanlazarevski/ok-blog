import { Component, HostListener, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './components/header/header';
import { FooterComponent } from './components/footer/footer.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, FooterComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private readonly viewportScroller = inject(ViewportScroller);
  public scrollPosition = signal(0);

  @HostListener("window:scroll")
  onWindowScroll() {
    const offset =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop || 0;
    this.scrollPosition.set(offset);
  }

  public goToTop(): void {
    document.documentElement.scrollTop = 0;
  }
}
