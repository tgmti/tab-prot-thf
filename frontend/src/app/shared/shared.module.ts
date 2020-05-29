import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicSearchPageComponent } from './components/dynamic-search-page/dynamic-search-page.component';
import { PoPageDynamicSearchModule } from '@po-ui/ng-templates';
import { PoTableModule } from '@po-ui/ng-components';

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
