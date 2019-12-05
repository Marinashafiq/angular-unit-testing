import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransferServiceService {
  private urlHistory: Array<any>;
  constructor() {
    this.urlHistory = [];
   }

   public setUrlHistoryObj(val: Array<any>): void {
    this.urlHistory = val;
  }

  public getUrlHistoryObj(): Array<any> {
      return this.urlHistory;
  }
}
