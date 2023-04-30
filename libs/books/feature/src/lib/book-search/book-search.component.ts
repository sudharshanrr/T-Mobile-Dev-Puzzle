import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  getBooksError,
  ReadingListBook,
  searchBooks
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Observable } from 'rxjs';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss']
})
export class BookSearchComponent implements OnInit {
  books: ReadingListBook[];
  errorMessage: string;
  loading = false;

  searchForm = this.fb.group({
    term: ''
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}


  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
      if(books.length){
        this.errorMessage = '';
      }
      this.loading = false;
    });
    this.store.select(getBooksError).subscribe((err: any)=>{
      if(err){
        this.store.dispatch(clearSearch());
        this.errorMessage = err?.error ? err?.error.message : 'Something went wrong! Couldn\'t fetch Book details for the given search term!';
        this.loading = false;
      }
    });
  }

  formatDate(date: void | string) {
    return date
      ? new Intl.DateTimeFormat('en-US').format(new Date(date))
      : undefined;
  }

  addBookToReadingList(book: Book) {
    this.store.dispatch(addToReadingList({ book }));
  }

  searchExample() {
    this.searchForm.controls.term.setValue('javascript');
    this.searchBooks();
  }

  searchBooks() {
    this.loading = true;
    if (this.searchForm.value.term) {
      this.store.dispatch(searchBooks({ term: this.searchForm.value.term }));
    } else {
      this.store.dispatch(clearSearch());
    }
  }
}
