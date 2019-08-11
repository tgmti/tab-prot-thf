import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { PoBreadcrumb, PoTableColumn, PoDynamicFormField } from '@portinari/portinari-ui';

@Component({
  selector: 'app-dynamic-search-page',
  templateUrl: './dynamic-search-page.component.html',
  styleUrls: ['./dynamic-search-page.component.css']
})
export class DynamicSearchPageComponent implements OnInit {

  public title: string;
  public isLoading: boolean;

  public items: Array<PoTableColumn>;
  public columns: Array<PoTableColumn> = [];
  public breadcrumb: PoBreadcrumb;
  public hasNext: boolean;
  public filters: Array<PoDynamicFormField>;
  
  private service: any;
  private queryParams: any;

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
    this.filters = this.columns.map( f => ({
      property: f.property, label: f.label
    })
    )
    this.getList();
  }

  getList(queryParams: any = { }) {

    this.queryParams = queryParams;

    this.isLoading = true;
    this.service.get(queryParams).subscribe(response => {
      this.items = response.items;
      this.hasNext = response.hasNext;
    },
    error => console.error(`Erro ao buscar ${this.title}`, error),
    () => this.isLoading = false
    );
  }

  onQuickSearch(filter) {
    this.getList({ page: 1, filter });
  }

  onChangeDisclaimers(disclaimers) {
    const params = JSON.parse(`{ ${disclaimers.map(d => `"${d.property}": "${d.value}"` ).join(', ')} }`);
    this.getList({ page: 1, ...params });
  }

  onAdvancedSearch(filters) {
    this.getList({page: 1, ...filters});
  }

}
