import { Injectable } from '@angular/core';
import { InjectionToken } from '@angular/core';

export let  TOASTR_TOKEN = new InjectionToken<Toastr>('toastr');

export interface Toastr {
  success(msg: string, title: string)
  info(msg: string, title: string)
  warning(msg: string, title: string)
  error(msg: string, title: string)
}

