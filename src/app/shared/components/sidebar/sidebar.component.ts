import { Component, input } from '@angular/core';

@Component({
  selector: 'pls-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  public readonly popoverId = input<string>('sidebar-popover');
  public readonly side = input<'left' | 'right'>('left');
}
