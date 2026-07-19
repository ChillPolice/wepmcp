import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopPanelComponent } from './shared';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopPanelComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('webmcp');
}
