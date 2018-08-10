import { Component, OnInit } from '@angular/core';
import { ObserveService } from '../observe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-channel',
  templateUrl: './search-channel.component.html',
  styleUrls: ['./search-channel.component.scss']
})
export class SearchChannelComponent implements OnInit {

  constructor( private observe: ObserveService, private router: Router) { }
  item: string = '';
  channelData: any;
  reg: any;
  userData: any;
  searchData = [];
  ngOnInit() {

    this.userData = JSON.parse(sessionStorage.getItem("userData"));

    this.observe.getAllChannel().subscribe(res => {
      console.log(res);
      this.channelData = res;
    },
      err => {
        console.log(err)
      })
  }
  findchannel() {

    if (this.item.length < 3) {
      return;
    }
    this.item = this.item.toLowerCase();
    this.reg = new RegExp(this.item, "i");
    this.searchData.length = 0;
    for (let channel of this.channelData.channels) {
      if (this.reg.test(channel.unique_name)) {
        this.searchData.push(channel.unique_name)
      }
    }
  }

  addToChannel(id) {

    var confimAdd = window.confirm("Add this channel");
    if (confimAdd) {
      this.observe.addUserChannel(id, this.userData.email).subscribe(res => {
        console.log(res);
        this.observe.getAllChannel().subscribe(res => {
          console.log(res);
          this.channelData = res;
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

  showAllChannel() {
    this.searchData.length = 0;
    for (let channel of this.channelData.channels) {
      this.searchData.push(channel.unique_name)
    }
  }
}
