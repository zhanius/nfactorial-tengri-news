import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NewsComponent } from '../news/news.component';
import { FormsModule } from '@angular/forms';
import { NewsService } from '../news.service';
import { LatestNewsComponent } from '../latest-news/latest-news.component';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterModule, RouterOutlet, NewsComponent, FormsModule, LatestNewsComponent],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  @Input() item = '';
  
}
