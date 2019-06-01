import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  ThfTableColumn,
  ThfPageAction,
  ThfNotificationService,
  ThfBreadcrumb
} from '@totvs/thf-ui';
import { GenericService } from 'src/app/generic/service/generic.service';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.css']
})
export class GenericListComponent<T> implements OnInit {

  private data: Array<T>;
  private columns: Array<ThfTableColumn>;

  public readonly actions: Array<ThfPageAction> = [
    { label: 'Visualizar', action: this.viewData.bind(this), disabled: this.disableViewParam.bind(this) }
  ];

  public readonly breadcrumb: ThfBreadcrumb = {
    items: [
      { label: 'Home', action: this.beforeRedirect.bind(this) },
      { label: 'Params' }
    ]
  };

  constructor(
    private dataService: GenericService<T>,
    private thfNotification: ThfNotificationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.dataService.getColumns();
    this.loadData();
  }

  onAdvancedSearch(filter) {
    filter ? this.searchItems(filter) : this.resetFilters();
  }

  onChangeDisclaimers(disclaimers) {
    const filter = {};
    disclaimers.forEach(item => {
      filter[item.property] = item.value;
    });
    this.searchItems(filter);
  }

  onQuickSearch(filter) {
    filter ? this.searchItems({ name: filter }) : this.resetFilters();
  }

  private beforeRedirect(itemBreadcrumbLabel) {
    if (this.params.some(candidate => candidate['$selected'])) {
      this.thfDialog.confirm({
        title: `Confirm redirect to ${itemBreadcrumbLabel}`,
        message: `There is data selected. Are you sure you want to quit?`,
        confirm: () => this.router.navigate(['/'])
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  private disableViewParam() {
    return !this.params.find(param => param['$selected']);
  }

  private viewParam() {
    const selectedParam = this.params.find(param => param['$selected']);
    this.thfNotification.success(`Visualizar a param ${selectedParam['name']}`);
  }

  private resetFilters() {
    this.params = this.paramsService.resetFilterParams();
  }

  private searchItems(filter) {
    this.params = this.paramsService.filter(filter);
  }

  private updateFilters() {
  }

  private viewData() {
    const selectedData = this.data.find(data => data['$selected']);
    this.thfNotification.success(`Visualizar a param ${selectedData['name']}`);
  }

  /** @description Consulta dos dados */
  public loadData(params: { page?: number, search?: string} = {}) {
    // this.loading = true;
    this.clientesService.setLoading(true)
    this.clientesService.get(params)
    // .pipe(take(1))
    .subscribe((response: {hasNext: boolean, items: Array<any>}) => {
      this.clientes = !params.page || params.page === 1 
      ? response.items
      : [...this.clientes, ...response.items];
      // this.hasNext = response.hasNext;
      this.clientesService.setHasNext(response.hasNext);
      this.clientesService.setLoading(false);
      // this.loading = false;
    });

}
