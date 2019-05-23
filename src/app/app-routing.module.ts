import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'home', loadChildren: './home/home.module#HomeModule' },
  { path: 'params', loadChildren: './params/params.module#ParamsModule' },
  { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
  { path: 'users', loadChildren: './users/users.module#UsersModule' },
  { path: '', redirectTo: '/params', pathMatch: 'full'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
