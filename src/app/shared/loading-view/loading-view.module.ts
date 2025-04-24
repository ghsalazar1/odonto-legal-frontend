import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingViewComponent } from './loading-view.component';
import { NbSpinnerModule } from '@nebular/theme';



@NgModule({
  declarations: [LoadingViewComponent],
  exports: [LoadingViewComponent],
  imports: [
    CommonModule,
    NbSpinnerModule
  ]
})
export class LoadingViewModule { }
