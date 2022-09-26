import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {BrowserModule} from '@angular/platform-browser'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'

import {AppRoutingModule} from './app-routing.module'
import {AppComponent} from './app.component'
import {LoginComponent} from './login/login.component'
import {RegisterComponent} from './register/register.component'
import {UserProfileComponent} from './user-profile/user-profile.component'
import {AuthInterceptor} from './shared/authconfig.interceptor'
import {DashbaordComponent} from './dashbaord/dashbaord.component'
import {ClickOutsideDirective} from './shared/click-outside.directive'
import {FileUploadModule} from 'primeng/fileupload'
import {InputTextModule} from 'primeng/inputtext'
import {TableModule} from 'primeng/table'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    UserProfileComponent,
    DashbaordComponent,
    ClickOutsideDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule,
    InputTextModule,
    TableModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
