import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ComTableComponent } from './components/com-table/com-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    ComTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
}
