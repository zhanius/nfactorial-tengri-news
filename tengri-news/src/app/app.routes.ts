import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { NewsComponent } from './news/news.component';
import { NewsDetailsComponent } from './news-details/news-details.component';
import { LatestNewsComponent } from './latest-news/latest-news.component';


export const routes: Routes = [
    {path: '', redirectTo: 'news', pathMatch: 'full'},
    {path: 'news', component: NewsComponent, title: 'News'},
    {path: 'news/:id', component: NewsDetailsComponent, title: 'News Details'},
    {path: 'latestnews', component: LatestNewsComponent, title: 'Latest News'},
    {path: 'categories/:id/news', component: LatestNewsComponent, title: 'Filtered News'}
];
