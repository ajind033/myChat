import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatService{
  constructor() { }
  currentChannel:string="general";
getcurrentChannel(){
return this.currentChannel;
}
setcurrentChannel(channel){
this.currentChannel=channel;
}
}
