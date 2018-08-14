import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { ObserveService } from '../observe.service';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  constructor(private observe: ObserveService, private router: Router) { }
  message: any;
  author: any;
  userData: any;
  msg: string = '';
  setInt: any;
  currChannel: string = "general";
  ngOnDestroy() {
    clearInterval(this.setInt);
  }
  ngOnInit() {

    localStorage.setItem("key2", "aerwss==");
    this.userData = JSON.parse(localStorage.getItem("userData"))
    this.observe.createUser(this.userData.email, this.userData.name).subscribe(res => {
      console.log(res);
    },
      err => {
        console.log(err)
      })

    this.observe.addToGeneralChannel(this.userData.email).subscribe(res => {
      console.log(res);
      this.router.navigateByUrl('/RefrshComponent', { skipLocationChange: true }).then(() =>
            this.router.navigate(["/chat"]));
    },
      err => {
        console.log(err)
      })
    this.setInt = setInterval(() => {
      this.observe.getAllMessage().subscribe(res => {
        console.log(res);
        this.message = res.messages;
        this.currChannel = localStorage.getItem("channel");
      
      },
        err => {
          console.log(err)
        })
    }, 2000)

  }
  sendMsg() {

    if (this.msg == "") {
      return;
    }
     var userName={
      "name":this.userData.name
    }
    console.log(this.msg);
    
    this.observe.sendMessage(this.msg, this.userData.email,JSON.stringify(userName)).subscribe(res => {
      console.log(res);
      this.msg = "";

    },
      err => {
        console.log(err)
      })
  }
  logout() {
    localStorage.clear();
    alert("You are logged out!!");
    this.router.navigate(['/']);
  }
}




