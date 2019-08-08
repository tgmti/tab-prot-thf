import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicSearchPageComponent } from './components/dynamic-search-page/dynamic-search-page.component';
import { PoPageDynamicSearchModule } from '@portinari/portinari-templates';


@NgModule({
  declarations: [DynamicSearchPageComponent],
  imports: [
    CommonModule,
    PoPageDynamicSearchModule,
  ],
  exports: [
    DynamicSearchPageComponent
  ],
})
export class SharedModule { }
