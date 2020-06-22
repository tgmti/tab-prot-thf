import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PoPageDynamicTableComponent } from '@po-ui/ng-templates';

import backendCFG from '../assets/backendCFG.json';

const serviceApi = (path: string) => `${backendCFG.urlAPI}${path}`;

const routes: Routes = [
  { path: 'tables', component: PoPageDynamicTableComponent, data: {
    serviceApi: serviceApi('tables'),
  } },
  { path: 'fields', component: PoPageDynamicTableComponent, data: {
    serviceApi: serviceApi('fields'),
  } },
  { path: 'indexes', component: PoPageDynamicTableComponent, data: {
    serviceApi: serviceApi('indexes'),
  } },
  { path: 'params', component: PoPageDynamicTableComponent, data: {
    serviceApi: serviceApi('params'),
  } },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
