import { Directive, Input, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
import { DialogRef } from './dialog-ref';
import { DialogService } from './dialog.service';

@Directive({
  selector: '[ngneatDialog]'
})
export class DialogDirective implements OnChanges {
  @Input('ngneatDialog') toggle = false;

  private dialogRef: DialogRef;

  constructor(private dialogService: DialogService, private templateRef: TemplateRef<any>) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.toggle) {
      this.handleToggleChanges();
    }
  }

  private handleToggleChanges() {
    if (this.toggle) {
      this.dialogRef = this.dialogService.open(this.templateRef);
    } else if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
