import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private categorySubject = new BehaviorSubject<string>('');
  category$: Observable<string> = this.categorySubject.asObservable();

  setCategory(category: string) {
    this.categorySubject.next(category);
  }
}