import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { News, NewsDetail } from './newsTemplate';
import { Category } from './categories';

@Injectable({
  providedIn: 'root'
})
export class NewsService {
  BACKEND_URL = 'http://localhost:8000/api'

  private newsList: News[] = [];
  constructor(private client: HttpClient) { }

  getNews(page: number = 1): Observable<News[]>{
    console.log(page)
    return this.client.get<News[]>(`${this.BACKEND_URL}/news?page=${page}`);
  }

  getNewsById(id: number): Observable<NewsDetail>{
    return this.client.get<NewsDetail>(`${this.BACKEND_URL}/news/${id}`);
  }

  getMainNews(): Observable<News>{
    return this.client.get<NewsDetail>(`${this.BACKEND_URL}/news/main`);
  }

  getCategories(): Observable <Category[]>{
    return this.client.get<Category[]>(`${this.BACKEND_URL}/categories/`);
  }

  // searchNews(query: string): Observable<any> {
  //   return this.client.get(`${this.BACKEND_URL}/news/search?query=${query}`);
  // }

  getLatestNews(): Observable<News[]>{
    return this.client.get<News[]>(`${this.BACKEND_URL}/latestnews/`);
  }

  getNewsByCategory(id: number): Observable<News[]>{
    return this.client.get<News[]>(`${this.BACKEND_URL}/categories/${id}/news`);
  }
  
}


