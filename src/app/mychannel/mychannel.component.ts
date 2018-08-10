import { Component, OnInit } from '@angular/core';
import { ObserveService } from '../observe.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mychannel',
  templateUrl: './mychannel.component.html',
  styleUrls: ['./mychannel.component.scss']
})
export class MychannelComponent implements OnInit {

  constructor( private observe: ObserveService, private router: Router) {
    this.userData = JSON.parse(sessionStorage.getItem("userData"))

    this.observe.getUserChannel(this.userData.email).subscribe(res => {
      console.log(res);
      sessionStorage.setItem("userAllChannel",JSON.stringify(res));
     
    },
      err => {
        console.log(err)
      })
  }
  userData: any;
  userChanneldata =[];
  channelFag:boolean=false;
  ngOnInit() {
    
  }
  changeChannel(channel) {
    sessionStorage.setItem("channel", channel);
    console.log(channel);
  }
  addChannel() {
    var channelName = prompt("Please enter the channel name");
    if ((channelName == '') || (channelName == null)) {
      alert("Enter the channel name")
      return;
    }
    console.log(channelName)
    this.observe.createChannel(channelName).subscribe(res => {
      console.log(res);
      this.observe.addUserChannel(channelName, this.userData.email).subscribe(res => {
        console.log(res);
        this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
          this.router.navigate(["/chat"]));
      },
        err => {
          console.log(err)
        })
    },
      err => {
        alert("Channel already exists");
        console.log(err)
      })
  }

  showUserChannel(){
    this.userChanneldata.length=0;
    var AllChanenl=JSON.parse(sessionStorage.getItem("allchannel"));
    var userAllChannel = JSON.parse(sessionStorage.getItem("userAllChannel"));
    for(let channel of AllChanenl.channels){
      for(let uChannel of userAllChannel.channels){
        if(channel.sid == uChannel.channel_sid){
          this.userChanneldata.push(channel.unique_name);
        }
      }
    }
    this.channelFag=! this.channelFag;
    if(this.channelFag){
      document.getElementById("channelHeading").style.color="white";
    }
    else{
      document.getElementById("channelHeading").style.color="#AB9BA9";

    }

  }
}
