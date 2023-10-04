import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appTimeMask]',
})
export class TimeMaskDirective {
  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('input', ['$event']) onInput(event: InputEvent) {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove non-numeric characters

    if (value.length > 4) {
      value = value.slice(0, 4);
    }

    if (value.length >= 2) {
      value = value.slice(0, 2) + ':' + value.slice(2);
    }

    this.renderer.setProperty(input, 'value', value);
  }
}
