import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TablesComponent } from './tables/tables.component';
import { ParamsComponent } from './params/params.component';
import { IndexesComponent } from './indexes/indexes.component';
import { FieldsComponent } from './fields/fields.component';


const routes: Routes = [
  { path: 'tables', component: TablesComponent },
  { path: 'fields', component: FieldsComponent },
  { path: 'indexes', component: IndexesComponent },
  { path: 'params', component: ParamsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
