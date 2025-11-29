import { Component, effect, ElementRef, input, OnInit, viewChild } from '@angular/core';
import { toHTML } from '@portabletext/to-html';

@Component({
  selector: 'portable-text-display',
  imports: [],
  templateUrl: './portable-text-display.component.html',
  styleUrl: './portable-text-display.component.css',
})
export class PortableTextDisplayComponent {
  public body = input<any>();
  public textBodyElement = viewChild<ElementRef<HTMLDivElement>>('textBody');

  constructor() {
    effect(() => {
      const element = this.textBodyElement()?.nativeElement;
      const content = toHTML(this.body());

      if(element) {
        element.innerHTML = content;
      }
    });
  }
}
