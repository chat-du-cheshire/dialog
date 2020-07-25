import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { DialogConfig } from '@ngneat/dialog';

@Component({
  selector: 'app-dialog-directive-example',
  templateUrl: './dialog-directive-example.component.html',
  styleUrls: ['./dialog-directive-example.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DialogDirectiveExampleComponent implements OnInit {
  @Input() config: DialogConfig;

  showDialog = false;

  constructor() {}

  ngOnInit(): void {}

  onDialogClosed = () => {
    this.showDialog = false;
  };

  onBackdropClicked = () => {
    console.log('Backdrop clicked');
  };

  openDialog() {
    this.showDialog = true;
  }
}
