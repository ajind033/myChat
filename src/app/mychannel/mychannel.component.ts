import { Component, OnInit } from '@angular/core';
import { ObserveService } from '../observe.service';
import { GoogleLoginService } from '../google-login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-mychannel',
  templateUrl: './mychannel.component.html',
  styleUrls: ['./mychannel.component.scss']
})
export class MychannelComponent implements OnInit {

  constructor(private googleService: GoogleLoginService, private observe: ObserveService, private router: Router) {
    this.userData = JSON.parse(sessionStorage.getItem("userData"))

    this.observe.getUserChannel(this.userData.email).subscribe(res => {
      console.log(res);
      this.userChannel = res.channels;
    },
      err => {
        console.log(err)
      })
  }
  userData: any;
  userChannel: any;
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
        console.log(err)
      })
  }
}
