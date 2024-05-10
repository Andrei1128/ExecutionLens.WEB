import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [],
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.scss',
})
export class PopoverComponent {
  @Input() x: number = 0;
  @Input() y: number = 0;
  @Input() content: string = '';
}
