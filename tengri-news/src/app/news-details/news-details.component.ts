import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { News, NewsDetail } from '../newsTemplate';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news-details',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './news-details.component.html',
  styleUrl: './news-details.component.css'
})
export class NewsDetailsComponent implements OnInit {
  news: NewsDetail;
  loaded: boolean = false;

  constructor(private route: ActivatedRoute, private newsService: NewsService){
    this.news = {} as NewsDetail;
    this.loaded = true;
  }
  
  ngOnInit(){
    this.route.paramMap.subscribe((params) => {
      const id = Number(params.get('id'));
      this.loaded = false;
      this.newsService.getNewsById(id).subscribe((news) => {
        this.news = news;
        this.loaded = true;
      });
    })
  }
}
