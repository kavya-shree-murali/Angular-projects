import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
export function checkNull(value){
  return value != '' && value != undefined && value!= null
}
@Injectable()
export class MyInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log(request, next , 'intercetp')
    // You can modify the request here, such as adding headers or handling errors.
    const modifiedRequest = request.clone({
      setHeaders: {
        'Authorization': 'Bearer token123',
        'Auth' : 'Permission granted'
      },
    });

    return next.handle(modifiedRequest);
    
  }
}

// you can use multiple intercepter

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Add logging logic here
    console.log(`Sending request to ${req.url}`);
    return next.handle(req);
  }
}

export const fileFormats: any[] = [
  "image/jpeg",
  "application/pdf",
  "application/doc",
  "application/msword",
  "image/jpg"
];

export function getTypeOfFile(data: any) {
  let images = ["jpeg", "JPEG", 'jpg'];
  let fileFormarts = ["pdf", 'doc', 'msword'];
  let str = data;
  let path = checkNull(data) && str.includes(".") ? str.split(".").at(-1) : "";
  return images.includes(path) ? "image" : fileFormarts?.find(x => x == path) ? ((fileFormarts?.find(x => x == path).toLowerCase() == 'doc' || fileFormarts?.find(x => x == path).toLowerCase() == 'docx') ? 'doc' : "pdf") : "";
}
