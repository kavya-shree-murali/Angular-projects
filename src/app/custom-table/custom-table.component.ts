import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';

@Component({
  selector: 'app-custom-table',
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.css']
})
export class CustomTableComponent {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  @ViewChild(MatSort) sort: MatSort;

  @Input() public tooltip: any;

  @Input() needPagination: boolean = false

  @Input('limit') limit: any = 10

  @Input() pageOptions: any[]

  @Input('total') public total: any;

  @Input('disabled') public disabled: boolean = false;

  @Input('routerLink') public routerLink: any;

  @Input() buttonList: any[] = []

  @Input('displayedColumns') public displayedColumns: any = []

  @Input('dataSource') public dataSource: any;

  @Output() onPaginating: EventEmitter<any> = new EventEmitter()

  @Output() OnChecking: EventEmitter<any> = new EventEmitter()

  @Output() OnClicking: EventEmitter<any> = new EventEmitter()

  @Output() sorting: EventEmitter<any> = new EventEmitter()

  paginateData(event: MatPaginator) {
    this.onPaginating.emit({ skip: event.pageIndex, limit: event.pageSize, length: event.length })
  }

  Button(action) {
    this.OnClicking.emit({ action: action })
  }

  onSelectChange(event, data) {
    this.OnChecking.emit({ checked: event.checked, data: data })
  }

  sortData(sort: Sort) {
    this.sorting.emit({sort: sort})
  
  }

  ngOnInit() {
  }

}
