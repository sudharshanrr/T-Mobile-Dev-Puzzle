import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  addToReadingList,
  clearSearch,
  getAllBooks,
  getBooksError,
  ReadingListBook,
  searchBooks,
} from '@tmo/books/data-access';
import { FormBuilder } from '@angular/forms';
import { Book } from '@tmo/shared/models';
import { Observable, Subscription, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'tmo-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.scss'],
})
export class BookSearchComponent implements OnInit, OnDestroy {
  books: ReadingListBook[];
  errorMessage: string;
  loading = false;
  searchSubscription$: Subscription;

  searchForm = this.fb.group({
    term: '',
  });

  constructor(
    private readonly store: Store,
    private readonly fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe((books) => {
      this.books = books;
      if (books.length) {
        this.errorMessage = '';
      }
      this.loading = false;
    });
    this.store.select(getBooksError).subscribe((err: any) => {
      if (err) {
        this.store.dispatch(clearSearch());
        this.errorMessage = err?.error
          ? err?.error.message
          : "Something went wrong! Couldn't fetch Book details for the given search term!";
        this.loading = false;
      }
    });

    this.searchSubscription$ = this.searchForm
      .get('term')
      .valueChanges.pipe(
        debounceTime(500),
        distinctUntilChanged())
      .subscribe((newValue) => {
        this.loading = true;
        if (newValue) {
          this.store.dispatch(searchBooks({ term: newValue }));
        } else {
          this.store.dispatch(clearSearch());
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
    this.errorMessage = '';
    this.searchForm.controls.term.setValue('javascript');
  }

  ngOnDestroy(): void {
    this.searchSubscription$?.unsubscribe();  
  }
}
