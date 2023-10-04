import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { TooltipConfig } from 'ngx-bootstrap/tooltip';

export function getAlertConfig(): TooltipConfig {
  return Object.assign(new TooltipConfig(), {
    placement: 'right',
    container: 'body'
  });
}

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD-MM-YYYY',
  },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-custom',
  templateUrl: './custom.component.html',
  styleUrls: ['./custom.component.css'],
  providers: [

    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class CustomComponent {

  range: FormGroup;
  fancyV2Images: any[];

  title = 'project';
  loggedIn: boolean = false;
  today: Date;
  images: any[] = [
    { image_url: 'assets/php.jpg' },
    { image_url: 'assets/php1.jpg' },
    { image_url: 'assets/banner.jpg' },
  ]

  ngOnInit() {
    this.today = new Date();
    this.initialForm();
    this.fancyV2Images = this.images.map((ele: any) => ele?.image_url);

  }



  initialForm() {
    this.range = new FormGroup({
      inputValue: new FormControl('', [Validators.required]),
      mobile: new FormControl('', [Validators.required]),
      Textdate: new FormControl('', [Validators.required]),
      start: new FormControl('', [Validators.required]),
      time: new FormControl('', [Validators.required])
    })
    console.log(this.range, '.')
  }

  textPattern = /^\S(?:.*\S)?$/

  mobilePattern = /^[6,7,8,9]{1}[0-9]{9}$/

  emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  validDatePattern = /^\d{2}-\d{2}-\d{4}$/; // YYYY-MM-DD format

  mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/];

  maskTime  = /^(0?[1-9]|1[0-2]):[0-5][0-9] [APap][mM]$/

  todo = [
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog'
  ];

  progress = [
    'Sleep well',
    'Tooth brush',
    'Walking',
    'Moniter'
  ]

}
