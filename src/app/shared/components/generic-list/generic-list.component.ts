import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {
  ThfTableColumn,
  ThfPageAction,
  ThfNotificationService,
  ThfBreadcrumb,
  ThfDynamicFormField,
  ThfDialogService
} from '@totvs/thf-ui';
import { GenericService } from 'src/app/shared/services/generic.service';

@Component({
  selector: 'app-generic-list',
  templateUrl: './generic-list.component.html',
  styleUrls: ['./generic-list.component.css']
})
export class GenericListComponent implements OnInit {

  protected title: string;
  protected items: Array<any>;
  protected columns: Array<ThfTableColumn>;

  public readonly filters: Array<ThfDynamicFormField>;

  public readonly actions: Array<ThfPageAction> = [
    { label: 'Visualizar', action: this.viewData.bind(this), disabled: this.disableViewData.bind(this) }
  ];

  public readonly breadcrumb: ThfBreadcrumb = {
    items: [
      { label: 'Home', action: this.beforeRedirect.bind(this) },
      { label: this.title }
    ]
  };

  constructor(
    private dataService: GenericService<any>,
    private thfNotification: ThfNotificationService,
    private thfDialog: ThfDialogService,
    private router: Router
  ) { 
    this.filters = this.dataService.getFiltersFields();
  }

  ngOnInit() {
    this.columns = this.dataService.getColumns();
    this.items = this.dataService.getItems();
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
    filter ? this.searchItems({ x6_var: filter }) : this.resetFilters();
  }

  private beforeRedirect(itemBreadcrumbLabel) {
    if (this.items.some(data => data['$selected'])) {
      this.thfDialog.confirm({
        title: `Confirm redirect to ${itemBreadcrumbLabel}`,
        message: `There is data selected. Are you sure you want to quit?`,
        confirm: () => this.router.navigate(['/'])
      });
    } else {
      this.router.navigate(['/']);
    }
  }

  private disableViewData() {
    return !this.items.find(data => data['$selected']);
  }

  private viewData() {
    const selectedParam = this.items.find(param => param['$selected']);
    this.thfNotification.success(`Visualizar a param ${selectedParam['name']}`);
  }

  private resetFilters() {
    this.items = this.dataService.resetFilterParams();
  }

  private searchItems(filter) {
    this.items = this.dataService.filter(filter);
  }

  /** @description Consulta dos dados */
  /* 
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
    */

}
