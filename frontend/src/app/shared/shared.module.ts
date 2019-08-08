import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicSearchPageComponent } from './components/dynamic-search-page/dynamic-search-page.component';
import { PoPageDynamicSearchModule } from '@portinari/portinari-templates';
import { PoTableModule } from '@portinari/portinari-ui';

@NgModule({
  declarations: [DynamicSearchPageComponent],
  imports: [
    CommonModule,
    PoPageDynamicSearchModule,
    PoTableModule,
  ],
  exports: [
    DynamicSearchPageComponent
  ],
})
export class SharedModule { }
