import { Component, Inject, effect, signal } from '@angular/core';
import { TooltipConfig } from 'ngx-bootstrap/tooltip';
import { Observable, Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';
import { ApiService } from '../services/service';
import { TOASTR_TOKEN } from '../services/toastr.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  public collapsed = false;

  counter = signal<any>(12000)

  quantity = signal([1, 2, 3, 4, 5, 6])

  subscribe: Subscription;

  myPromise: any; myObservable: any;

 

  constructor(public service: ApiService, @Inject(TOASTR_TOKEN) private toastr: ToastrService, public router: Router) {
    effect(() => {
      if (this.counter() > 30000)
        this.toastr.success('Reached 3000 above Effect Hitting....!')
    })
  }

  optionSelected(event: any) {
    console.log(event)
    this.counter.update(crt => {
      return 12000 * event.value
    })
  }

  ngOnInit() {
    // this.getData();

  

    this.myPromise = new Promise(resolve => {
      // console.log('Promise execution time is fast , it is execute only one time & can maintaine async data ...')
      setInterval(() => {
        resolve('Promise execution time is fast , it is execute only one time & can maintaine async data ...')
      }, 1000)
    })

    this.myObservable = new Observable(resp => {
      this.toastr.info('Observables are very lazy & will execute multiple time supported to sync & async data ...')
      setInterval(() => {
        resp.next('Observables')
      }, 2000)
    })

  }

  // getData() {
  //   this.subscribe = this.service.makeHttpRequest().subscribe((res: any) => {
  //     console.log(res, 'resp')
  //   })
  // }

  ngOnDestroy() {
    this.subscribe.unsubscribe();
  }

  createPromise() {
    this.subscribe = this.myPromise.then((data) => {
      this.toastr.info(data)
    })
  }

  createObservable() {
    this.subscribe = this.myObservable.subscribe((data) => {
      console.log(data, 'observable subscribed')
    })
  }

  unsubscribe() {
    this.toastr.info('Unsubscribe both Promise & Observable')
    this.subscribe.unsubscribe();
  }

  success(message: string): void {
    this.toastr.success(message, "Success");
  }

  info(message: string): void {
    this.toastr.info(message, "Info");
  }

  warning(message: string): void {
    this.toastr.warning(message, "Warning");
  }

  error(message: string): void {
    this.toastr.error(message, "Error");
  }

  route(){
    this.router.navigate(['/custom'])
  }
}
