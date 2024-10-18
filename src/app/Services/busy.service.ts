import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable({
  providedIn: 'root'
})
export class BusyService {
  busyRequestCount = 0;
  constructor(private services:NgxSpinnerService)
   {

    }

  busy(){
    this.busyRequestCount++;
    this.services.show(undefined, {
      type: 'timer', // Set a valid spinner type
      bdColor: 'rgba(255,255,255,0.7)',
      color: '#333333'
    });
  }

  idle(){
    this.busyRequestCount--;
    if(this.busyRequestCount <= 0){
      this.busyRequestCount = 0;
      this.services.hide();
    }
  }
}
