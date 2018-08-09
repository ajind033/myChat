import { Component, OnInit, OnDestroy } from '@angular/core';
import { GoogleLoginService } from '../google-login.service';

import { ObserveService } from '../observe.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(private googleService: GoogleLoginService, private observe: ObserveService) { }
  message: any;
  author: any;
  userData: any;
  msg: string = '';
  setInt: any;
  ngOnDestroy() {
    clearInterval(this.setInt);
  }
  ngOnInit() {

    this.userData = this.googleService.getData();
    this.observe.createUser(this.userData.email, this.userData.name).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log(err)
      })

    this.observe.addToGeneralChannel(this.userData.email).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log(err)
      })
    this.setInt = setInterval(() => {
      this.observe.getAllMessage().subscribe(res => {
        console.log(res);
        this.message = res.messages;

      },
        err => {
          console.log(err)
        })
    }, 1000)

  }
  sendMsg() {
    if (!localStorage.getItem("channel")) {
      window.alert("Please Select a Channel from my Channel");
    }
    console.log(this.msg);
    this.observe.sendMessage(this.msg, this.userData.email).subscribe(res => {
      console.log(res);
      this.msg = "";

    },
      err => {
        console.log(err)
      })
  }
}




