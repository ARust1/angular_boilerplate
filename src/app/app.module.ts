import { GenericService } from './services/generic/generic.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginModule } from '../app-login/login.module';
import {HttpClientModule} from '@angular/common/http';
import { CredentialsService } from './services/credentials/credentials.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    LoginModule,
    HttpClientModule
  ],
  providers: [
    GenericService,
    CredentialsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
