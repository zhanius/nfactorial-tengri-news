import { Component, EventEmitter, Input, OnInit, Output , OnChanges, SimpleChanges} from '@angular/core';
import { NewsService } from '../news.service';
import { News } from '../newsTemplate';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterModule, FormsModule],
  templateUrl: './news.component.html',
  styleUrl: './news.component.css',
})
export class NewsComponent {
  @Input() category = '';
  news: News[];
  loaded: boolean;
  page : any;
  currentPage: number = 1;
  mainNew = {} as News;

  newsList: News[];


  constructor(private newsService: NewsService, private route: ActivatedRoute, private router: Router) {
    this.news = [];
    this.loaded = false;
    this.newsList = [];

  }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.page = params['page'];
    });
    this.loaded = false;
    this.newsService.getNews(this.page).subscribe((news) => {
      this.news = news;
      this.loaded = true;
    });
    // console.log(this.news);

    this.mainNews();
    
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['category']) {
      this.filterNewsByCategory();
    }
  }

  filterNewsByCategory() {
    const filteredNews = this.news.filter((n) => {
      return n.category == this.category;
    });
    this.newsList = filteredNews;
  }

  mainNews(){
    this.newsService.getMainNews().subscribe((n) => {
      this.mainNew = n;
      
    })
    console.log(this.mainNew.id);
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
  
  changePage(pageNumber: number): void{
    this.currentPage = pageNumber;
    console.log("works");
    this.router.navigate([], { queryParams: { page: pageNumber }, queryParamsHandling: 'merge' });
    this.loadData();

  }

  loadData(): void {
    this.newsService.getNews(this.currentPage).subscribe(news => {
      this.news = news;
    });

    this.filterNewsByCategory(); 

  }

}
