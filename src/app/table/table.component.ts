import { Component, SimpleChanges } from '@angular/core';
import { ApiService } from '../services/service';
import { MatTableDataSource } from '@angular/material/table';
import { PaginationDTO } from './pagination';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
export interface Dessert {
  id: any;
  check: any;
  brand: any;
  images: any;
  status: any;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent {

  public loading = false;
  title: 'Custom Table'
  displayedColumns: any[] = ['check', 'id', 'brand', 'images', 'status', 'action']
  dataSource = new MatTableDataSource([]);
  limit: any;
  skip: any;
  total: any;
  isDisabled: boolean = false;
  pagintionDTO: PaginationDTO;
  list = [
    { name: 'View' },
    { name: 'Update' },
    { name: 'Delete' }
  ]
  disabled: any;
  sortedData: any[];
  value: any;

  constructor(public service: ApiService, private toastr: ToastrService, public route: Router) {
    this.pagintionDTO = new PaginationDTO();
    this.sortedData = this.dataSource.filteredData.slice();
  }

  ngOnInit() {
    this.getData();
  }

  ngOnChange(change: SimpleChanges) {
    console.log(change)
  }

  getData() {
    console.log(this.displayedColumns)
    this.loading = true;
    this.service.makeHttpRequest(this.pagintionDTO).subscribe((resp) => {
      this.dataSource = new MatTableDataSource(resp.products ?? [])
      console.log(this.dataSource)
      this.loading = false;
      this.limit = resp.limit
      this.total = resp.total;
      this.skip = resp.skip
    })
  }

  pagination(event) {
    console.log(event, 'event')
    this.pagintionDTO.skip = event.skip;
    this.pagintionDTO.limit = event.limit;
    this.getData();
  }

  click(event) {
    if (event.action == "View") {
      console.log(this.route)
      this.route.navigate([`/uploads`])
      this.toastr.success('successfully Viewed')
    } else if (event.action == 'Update') {
      this.route.navigate([`/uploads`])
      this.toastr.success('successfully Updated')
    } else if (event.action == 'Delete') {
      this.toastr.success('Successfully Deleted')
    }
  }

  check(event) {
    console.log(event)
    if(event.checked){
    this.toastr.success('Checked')
    }else {
      this.toastr.error('Unchecked')
    }
    // if(event.data.category == 'laptops' ){
    //   this.isDisabled = true;
    // }
  }

  sort(event) {
    const data = this.dataSource.filteredData.slice();
    if (!event.sort.active || event.sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = event.sort.direction === 'asc'
      switch (event.sort.active) {
        case 'id': return compare(a.id, b.id, isAsc);
        case 'brand': return compare(a.brand, b.brand, isAsc);
        case 'status': return compare(a.status, b.status, isAsc);
        default: return 0;
      }
    });

    this.dataSource = new MatTableDataSource(this.sortedData)
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);

}