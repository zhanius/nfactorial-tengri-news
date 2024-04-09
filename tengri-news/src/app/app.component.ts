import { Component, EventEmitter, Output } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { NewsComponent } from './news/news.component';
import { ContentComponent } from './content/content.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';
import { CategoryService } from './category.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, NewsComponent, ContentComponent, LatestNewsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})

export class AppComponent {
  title = 'tengri-news';

  currentCategory = '';

  
  constructor(private categoryService: CategoryService) {}

  showItem(name: string) {
    this.currentCategory = name;
    this.categoryService.setCategory(name);
  }
}
