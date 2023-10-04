import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { TranslationService } from '../services/translate';

@Pipe({
  name: 'translateToTamil',
  pure: false // Setting pure to false to handle async updates
})
export class TranslateToTamilPipe implements PipeTransform {
  constructor(private translationService: TranslationService) {}

  transform(value: string): Observable<string> {
    return this.translationService.translateToTamil(value);
  }
}
