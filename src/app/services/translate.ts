import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private baseUrl = 'http://localhost:3000'; // Update with your Node.js server URL

  constructor(private http: HttpClient) {}

  translateToTamil(text: any): Observable<string> {
    console.log(text)
    return this.http.post<string>(`${this.baseUrl}/translate`, { text });
  }
}
