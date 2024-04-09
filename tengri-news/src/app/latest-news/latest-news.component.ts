import { CommonModule } from '@angular/common';
import { Component, Input, OnInit , OnChanges, SimpleChange} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { INITIAL_CONFIG } from '@angular/platform-server';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import { NewsService } from '../news.service';
import { News } from '../newsTemplate';
import { Category, categories } from '../categories';
import { Subscription } from 'rxjs';
import { CategoryService } from '../category.service';

@Component({
  selector: 'app-latest-news',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './latest-news.component.html',
  styleUrl: './latest-news.component.css'
})
export class LatestNewsComponent implements OnInit {
  latestNews: News[];
  categoriesNews: News[];
  newsList: News[];
  categories = categories
  @Input() item = '';
  private categorySubscription! : Subscription;

  constructor(private newsService: NewsService, private route: ActivatedRoute, private router: Router, private categoryService : CategoryService) {
    this.latestNews = [];
    this.newsList = [];
    this.categoriesNews = [];
  }

  ngOnInit() {
    this.categorySubscription = this.categoryService.category$.subscribe(category => {
      this.item = category;
      this.loadNews();
    });
  }

  ngOnDestroy() {
    this.categorySubscription.unsubscribe();
  }

  loadNews() {
    if (this.item === '') {
      this.newsService.getLatestNews().subscribe(news => {
        this.latestNews = news;
      });
    } else{
      const cat = categories.find(obj => obj.name === this.item);
      const catId = cat ? cat.id : 1;
      console.log(catId);
      this.newsService.getNewsByCategory(catId).subscribe(news => {
        this.latestNews = news;
      });
    }

    console.log(this.item);
    console.log(this.latestNews);
  }

  setCategory(categoryName: string) {
    this.categoryService.setCategory(categoryName); 
  }
  
  formatDate(isoDateTime: Date): string {
    const months: string[] = [
        'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
    ];

    const date = new Date(isoDateTime);
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0'); 

    return `${day} ${months[monthIndex]} ${hours}:${minutes}`;
  }

}
