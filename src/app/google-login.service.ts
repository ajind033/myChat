import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleLoginService {

  constructor() { }
  data:any;
  getData():any{
        return this.data;
  }
  setData(data):void{
    this.data =data;
    }
}
