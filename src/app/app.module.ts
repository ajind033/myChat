import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';

import { Routes,RouterModule } from '@angular/router';
import{SocialLoginModule,GoogleLoginProvider,AuthServiceConfig} from 'angular-6-social-login';
import{ HttpClientModule} from '@angular/common/http'

import {ObserveService} from './observe.service';
import{AuthService} from'./auth.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import { SearchChannelComponent } from './search-channel/search-channel.component';
import { MychannelComponent } from './mychannel/mychannel.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("277051742558-0vg6jt7vkfar17th1o4f9j6tf2ven9dh.apps.googleusercontent.com")
      }
    ]
);
  return config;
}

 const routes:Routes=[
   {
     path:'',
     component:LoginComponent
   },
   {
     path:'chat',
     component:ChatComponent,
     canActivate:[AuthService]
   },
   {
     path:'**',
     component:PageNotFoundComponent
   }
 ]
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent,
    SearchChannelComponent,
    MychannelComponent,
    PageNotFoundComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    SocialLoginModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    ObserveService,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
