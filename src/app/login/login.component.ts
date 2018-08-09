import { Component, OnInit } from '@angular/core';
import{GoogleLoginProvider,AuthService} from 'angular-6-social-login'
import { Router} from '@angular/router'
import{GoogleLoginService} from '../google-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( private socialAuthService: AuthService, private router :Router, private googleService:GoogleLoginService) { }

  ngOnInit() {
    localStorage.setItem("channel","general");
  }
  public socialSignIn(socialPlatform : string) {
    let socialPlatformProvider;
    if(socialPlatform == "google"){
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform+" sign in data : " , userData);
        // Now sign-in with userData
        // ...
        this.googleService.setData(userData);
        this.router.navigate(["/chat"])
      }
      
    
    );
  }
}
