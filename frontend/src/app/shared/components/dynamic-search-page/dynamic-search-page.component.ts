import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PoBreadcrumb, PoTableColumn } from '@portinari/portinari-ui';

@Component({
  selector: 'app-dynamic-search-page',
  templateUrl: './dynamic-search-page.component.html',
  styleUrls: ['./dynamic-search-page.component.css']
})
export class DynamicSearchPageComponent implements OnInit {

  private title: string;
  private isLoading: boolean;

  private items: Array<PoTableColumn>;
  private columns: Array<PoTableColumn> = [];
  private breadcrumb: PoBreadcrumb;
  private hasNext: boolean;
  private service: any;

  @Input('p-service') set setService(service) {
    this.service = service;
  }

  constructor(private router: Router) {  }

  ngOnInit() {

    this.title = this.service.literals['title'];

    this.breadcrumb = {
      items: [
        { label: 'Home', action: () => this.router.navigate(['/']) },
        { label: this.title }
      ]
    };

    this.columns = this.service.getColumns();
    this.getList();
  }

  getList() {

    this.isLoading = true;
    this.service.get().subscribe(response => {
      this.items = response.items;
      this.hasNext = response.hasNext;
    },
    error => console.error(`Erro ao buscar ${this.title}`, error),
    () => this.isLoading = false
    );

  }

}
