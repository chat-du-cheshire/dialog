import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from '@ngneat/dialog';

import { AppComponent } from './app.component';
import { TestDialogComponent } from './test-dialog.component';
import { DialogDirectiveExampleComponent } from './components/dialog-directive-example/dialog-directive-example.component';
import { ClearConfigPipe } from './pipes/clear-config.pipe';

@NgModule({
  declarations: [AppComponent, TestDialogComponent, DialogDirectiveExampleComponent, ClearConfigPipe],
  imports: [BrowserModule, ReactiveFormsModule, DialogModule.forRoot()],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
