import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import Inputmask from 'inputmask';
import { formatDate } from '@angular/common';
export function timeFormatValidator(control: FormControl): { [key: string]: boolean } | null {
  const validTimePattern = /^(0?[1-9]|1[0-2]):[0-5][0-9] [APap][mM]$/; // HH:mm AM/PM format

  if (control.value && !validTimePattern.test(control.value)) {
    return { 'invalidTimeFormat': true };
  }

  return null;
}
export function checkNull1(value: any) {
  return (value != null) && (value != undefined) && (value != '') && (Array.isArray(value) ? value?.length > 0 : true)
}

export function checkNull(value: any) {
  return (value != null) && (value != undefined) && (value != '')
}

@Component({
  selector: 'app-customized',
  templateUrl: './customized.component.html',
  styleUrls: ['./customized.component.css']
})
export class CustomizedComponent {

  @Input('inputType') public inputType: string;

  @Input('form_control') public form_control: any;

  @Input('required') public required: boolean;

  @Input('error') public error: any;

  @Input('error_message') public error_message: any;

  @Input('placeholder') public placeholder: any;

  @Input('label') public label: any;

  @Input('pattern') public pattern: any;

  @Input('maxLength') public maxLength: any ;

  @Input('minLength') public minLength: any ;

  @Input('mask') public mask;

  @Input('todo') public todo;

  @Input('progress') public progress;

  @Input('done') public done;

  @ViewChild('myInput') myInputElementRef: ElementRef;

  @Input('errors') errors: any;

  min: any;
  max: any;
  today: any;
  maxi:boolean = false;
  mini:boolean = false;
  patterns:any;
  date: string;

  ngOnInit() {
  
    this.UIapperance();
    this.min = this.minLength;
    this.max = this.maxLength
    this.today = new Date()
    this.date = ( formatDate(this.today, 'dd/MM/yyyy', 'en-US'), '>>')
   

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }

  ngAfterViewInit(): void {
    if (this.inputType == 'date') {
      Inputmask('datetime', {
        inputFormat: this.placeholder,
        alias: 'datetime',
        min: '01/01/1980',
        clearMaskOnLostFocus: false,
        isComplete: function (buffer, opts) {
          console.log('Data', buffer, opts);
        }
      }).mask(this.myInputElementRef.nativeElement);
    }
  }

  UIapperance() {

    if (!checkNull(this.form_control)) {
      this.form_control = new FormControl();
    }

    this.label = this.label ? this.label : 'select'
    //placeHolder 
    this.placeholder = this.placeholder ? this.placeholder : 'Search'

  }

 
  
}
