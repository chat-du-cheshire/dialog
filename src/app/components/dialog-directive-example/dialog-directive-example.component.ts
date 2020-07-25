import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogConfig } from '@ngneat/dialog';

@Component({
  selector: 'app-dialog-directive-example',
  templateUrl: './dialog-directive-example.component.html',
  styleUrls: ['./dialog-directive-example.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogDirectiveExampleComponent implements OnInit {
  @Input() config: Partial<DialogConfig>;

  showDialog = false;
  showDialogWithConfig = false;

  constructor() {}

  ngOnInit(): void {}

  onDialogClosed = () => {
    this.showDialog = false;
    this.showDialogWithConfig = false;
  };

  onBackdropClicked = () => {
    console.log('Backdrop clicked');
  };

  openDialog() {
    this.showDialog = true;
  }

  openDialogWithConfig() {
    this.showDialogWithConfig = true;
  }
}
