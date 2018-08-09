import { Component, OnInit } from '@angular/core';
import {ObserveService} from '../observe.service';
import{GoogleLoginService} from '../google-login.service';
import{ChatService} from '../chat.service';

@Component({
  selector: 'app-mychannel',
  templateUrl: './mychannel.component.html',
  styleUrls: ['./mychannel.component.scss']
})
export class MychannelComponent implements OnInit {

  constructor(private googleService:GoogleLoginService,private observe:ObserveService,private chatSer:ChatService) {
    this.userData= this.googleService.getData();

    this.observe.getUserChannel(this.userData.email).subscribe(res=>{
      console.log(res);
      this.userChannel=res.channels;
    },
  err=>{
    console.log(err)
  })
   }
userData:any;
userChannel:any;
  ngOnInit() {  
    
  }
  changeChannel(channel){
   localStorage.setItem("channel",channel);
    console.log(channel);
  }
  addChannel(){
    var channelName = prompt("Please enter the channel name");
    console.log(channelName)
    this.observe.createChannel(channelName).subscribe(res=>{
      console.log(res);
      this.observe.addUserChannel(channelName,this.userData.email).subscribe(res=>{
        console.log(res);
      },
    err=>{
      console.log(err)
    })
    },
  err=>{
    console.log(err)
  })
  }
}
