import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { getReadingList, markAsRead, removeFromReadingList } from '@tmo/books/data-access';

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
  }

  markAsRead(item:any) {
    this.store.dispatch(markAsRead({ item }));
    const snackBarRef = this.snackBar.open(`Book ${item.title} Marked as read`, "", {
      horizontalPosition: 'left',
      verticalPosition: 'bottom',
      duration: 3000
    });
  }

}
