import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class ObserveService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic QUMyODE2MTJjOTlhYWIwN2I1MjQ2MTliM2YxZTdmMGQ1MDozMGE5YzJiMTQ3MWUyYjE3YjllNDhiYzgzMjZmZTZlOA=='
    })
  };
  constructor(private http: HttpClient) { }

  createUser(identity,friendlyname): Observable<any> {

    return this.http.post<any>(url+"/Users",
     "FriendlyName="+friendlyname+"&Identity="+identity+"&ServiceSid="+serviceId, this.httpOptions);
   
  }

  addToGeneralChannel(identity): Observable<any> {

    return this.http.post<any>(url+"/Channels/general/Members",
     "UniqueName =general&Identity="+identity+"&ServiceSid="+serviceId, this.httpOptions);

  }

  getAllChannel(): Observable<any> {

    return this.http.get(url+"/Channels/",
     this.httpOptions);

  }

  addUserChannel(unique_name,identity): Observable<any> {
    return this.http.post<any>(url+"/Channels/"+unique_name+"/Members",
     "UniqueName ="+unique_name+"&Identity="+identity+"&ServiceSid="+serviceId, this.httpOptions);

  }

  getUserChannel(identity): Observable<any> {

    return this.http.get(url+"/Users/"+identity+"/Channels/",
     this.httpOptions);

  }

  createChannel(channelName): Observable<any> {
    console.log(channelName)
        return this.http.post<any>(url+"/Channels/",
         "UniqueName="+channelName+"&ServiceSid="+serviceId, this.httpOptions);
      }

  getAllMessage(): Observable<any> {
    var channel = localStorage.getItem("channel");
    return this.http.get(url+"/Channels/"+channel+"/Messages",
    this.httpOptions);
  }

  sendMessage(msg,from): Observable<any> {
    var channel= localStorage.getItem("channel");
        return this.http.post<any>(url+"/Channels/"+channel+"/Messages",
         "UniqueName="+channel+"&Body="+msg+"&From="+from+"&ServiceSid="+serviceId, this.httpOptions);
    
      }

}
const serviceId:string='ISe211c7c0bb7449479b153de5442f9c17';
const url:string='https://chat.twilio.com/v2/Services/'+serviceId;