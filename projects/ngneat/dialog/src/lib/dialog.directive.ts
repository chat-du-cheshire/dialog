import {
  Directive,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  SimpleChanges,
  TemplateRef
} from '@angular/core';
import { DialogRef } from './dialog-ref';
import { DialogService } from './dialog.service';
import { Subject } from 'rxjs';
import { take, takeUntil } from 'rxjs/operators';
import { DialogConfig } from './config';

function isFunction(what) {
  return typeof what === 'function';
}

@Directive({
  selector: '[ngneatDialog]'
})
export class DialogDirective implements OnChanges, OnDestroy {
  @Input('ngneatDialog') toggle = false;

  // Those inputs used as callback events for structural directive
  @Input('ngneatDialogAfterClosed') onAfterClosed: (result) => void;
  @Input('ngneatDialogBackdropClicked') onBackdropClicked: () => void;

  @Input('ngneatDialogWith') config: DialogConfig;

  @Output() afterClosed = new EventEmitter();
  @Output() backdropClicked = new EventEmitter();

  private dialogRef: DialogRef;

  private destroy = new Subject();

  constructor(private dialogService: DialogService, private templateRef: TemplateRef<any>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.toggle) {
      this.handleToggleChanges();
    }
  }

  private handleToggleChanges() {
    if (this.toggle) {
      this.dialogRef = this.dialogService.open(this.templateRef, this.config);
      this.subscribeDialogRefEvents();
    } else if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  private subscribeDialogRefEvents() {
    if (!this.dialogRef) {
      return;
    }

    this.dialogRef.afterClosed$.pipe(take(1)).subscribe(result => this.handleAfterClosedSubscription(result));

    this.dialogRef.backdropClick$
      .pipe(takeUntil(this.dialogRef.afterClosed$))
      .subscribe(() => this.handleBackdropClickSubscription());
  }

  private handleAfterClosedSubscription(result) {
    this.afterClosed.next(result);
    if (isFunction(this.onAfterClosed)) {
      this.onAfterClosed(result);
    }
    this.clearDialogRef();
  }

  private clearDialogRef() {
    this.dialogRef = null;
  }

  private handleBackdropClickSubscription() {
    this.backdropClicked.next();
    if (isFunction(this.onBackdropClicked)) {
      this.onBackdropClicked();
    }
  }

  ngOnDestroy() {
    this.destroy.next();
    this.destroy.complete();
  }
}
