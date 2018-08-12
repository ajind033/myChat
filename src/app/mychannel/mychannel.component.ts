import { Component, OnInit } from '@angular/core';
import { ObserveService } from '../observe.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mychannel',
  templateUrl: './mychannel.component.html',
  styleUrls: ['./mychannel.component.scss']
})
export class MychannelComponent implements OnInit {

  constructor(private observe: ObserveService, private router: Router) {
    this.userData = JSON.parse(localStorage.getItem("userData"))

    this.observe.getUserChannel(this.userData.email).subscribe(res => {
      console.log(res);
      localStorage.setItem("userAllChannel", JSON.stringify(res));

    },
      err => {
        console.log(err)
      })
  }
  userData: any;
  userChanneldata = [];
  channelFag: boolean = false;
  ngOnInit() {
    setTimeout(() => {
      this.userChanneldata.length = 0;
      var AllChanenl = JSON.parse(localStorage.getItem("allchannel"));
      var userAllChannel = JSON.parse(localStorage.getItem("userAllChannel"));
      for (let channel of AllChanenl.channels) {
        for (let uChannel of userAllChannel.channels) {
          if (channel.sid == uChannel.channel_sid) {
            this.userChanneldata.push(channel.unique_name);
          }
        }
      }
      this.channelFag = !this.channelFag;
    }, 3000)
  }
  changeChannel(channel) {
    localStorage.setItem("channel", channel);
    console.log(channel);
  }
  addChannel() {
    var channelName = prompt("Please enter the channel name");
    if ((channelName == '') || (channelName == null)) {
      alert("You forgot to enter the channel name")
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
}
