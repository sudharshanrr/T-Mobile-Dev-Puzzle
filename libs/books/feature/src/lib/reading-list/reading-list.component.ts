import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { addToReadingList, getReadingList, removeFromReadingList } from '@tmo/books/data-access';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getReadingList);

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  removeFromReadingList(item) {
    this.store.dispatch(removeFromReadingList({ item }));
    const snackBarRef = this.snackBar.open(`Removed ${item.title} from reading List`, "Undo", {
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      duration: 3000
    });
    snackBarRef.onAction().subscribe(() => {
      this.store.dispatch(addToReadingList({
        book: {
          id: item.bookId, ...item
        }
      }))
    })
  }
}
