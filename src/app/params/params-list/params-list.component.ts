import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ThfBreadcrumb } from '@totvs/thf-ui/components/thf-breadcrumb';
import { ThfPageAction } from '@totvs/thf-ui/components/thf-page';
import { ThfDialogService } from '@totvs/thf-ui/services/thf-dialog';
import { ThfNotificationService } from '@totvs/thf-ui/services/thf-notification';
import { ThfTableColumn } from '@totvs/thf-ui/components/thf-table';

import { ParamsService } from './../params.service';


@Component({
  selector: 'app-params-list',
  templateUrl: './params-list.component.html',
  styleUrls: ['./params-list.component.css']
})
export class ParamsListComponent implements OnInit {

  params: Array<object>;
  paramsColumns: Array<ThfTableColumn>;

  public readonly actions: Array<ThfPageAction> = [
    { label: 'Visualizar', action: this.viewParam.bind(this), disabled: this.disableViewParam.bind(this) }
  ];

  public readonly breadcrumb: ThfBreadcrumb = {
    items: [
      { label: 'Home', action: this.beforeRedirect.bind(this) },
      { label: 'Params' }
    ]
  };

  public readonly filters: Array<any> = [
    { property: 'id', label: 'ID', gridColumns: 6 },
    { property: 'x6_var', label: 'Parâmetro', gridColumns: 6 },
    { property: 'x6_fil', label: 'Filial', gridColumns: 6 },
    { property: 'x6_tipo', label: 'Tipo', gridColumns: 6 },
  ];

  constructor(
    private paramsService: ParamsService,
    private thfNotification: ThfNotificationService,
    private thfDialog: ThfDialogService,
    private router: Router) { }

  ngOnInit() {
    this.params = this.paramsService.getItems();
    this.paramsColumns = this.paramsService.getColumns();

    this.updateFilters();
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
}
