import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(private snackBar:MatSnackBar) { }

  openMessageSnackBar(message: any, action: string) {
    this.snackBar.open(message, action, {
       duration: 2000,
       horizontalPosition: 'end',
       verticalPosition: 'bottom',
       panelClass: ['success-snack']
    });
  }

  openErrorSnackBar(message: any, action: string) {
    let errorMessage = '';
    if(message.error.errors){
      let messageParts =  message.error.errors;
      for (let prop in messageParts) {
        errorMessage += messageParts[prop]+'\n';
      }
    }else if(message.error.message){
      errorMessage = message.error.message;
    }

    this.snackBar.open(errorMessage, action, {
       duration: 3500,
         horizontalPosition: 'end',
         verticalPosition: 'bottom',
         panelClass: ['error-snack']
    });
    
  }
}
