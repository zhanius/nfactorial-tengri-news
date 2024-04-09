import { Component, EventEmitter, Output } from '@angular/core';
import { Category } from '../categories';
import { NewsService } from '../news.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() categorySelected = new EventEmitter<string>();
  categories: Category[]

  
  constructor(private newsService: NewsService, ) {
    this.categories = [];
  }

  ngOnInit() {
    this.newsService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
    console.log(this.categories);
  }
  
  setCategory(category: string){
    this.categorySelected.emit(category);
  }
  
}
