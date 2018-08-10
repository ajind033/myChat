import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ObserveService } from '../observe.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor( private observe: ObserveService,private router : Router ) { }
  message: any;
  author: any;
  userData: any;
  msg: string = '';
  setInt: any;
  ngOnDestroy() {
    clearInterval(this.setInt);
  }
  ngOnInit() {

    this.userData = JSON.parse(sessionStorage.getItem("userData"))
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

    if (this.msg=="") {
      return;
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
  logout(){
    sessionStorage.clear();
    alert("You are logged out!!");
    this.router.navigate(['/']);
  }
}




