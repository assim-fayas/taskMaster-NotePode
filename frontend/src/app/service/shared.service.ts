import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private formSubmittedSource = new Subject<boolean>();
  formSubmitted$ = this.formSubmittedSource.asObservable();

  constructor() { }

  updateFormSubmitted(submitted: boolean) {
    this.formSubmittedSource.next(submitted);
  }
}
