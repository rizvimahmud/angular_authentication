import {HTTP_INTERCEPTORS} from '@angular/common/http'
import {NgModule} from '@angular/core'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {RouterModule, Routes} from '@angular/router'
import {FileUploadModule} from 'primeng/fileupload'
import {LoginComponent} from './components/login/login.component'
import {RegisterComponent} from './components/register/register.component'
import {AuthGuard} from './guards/auth.guard'
import {AuthInterceptor} from './interceptors/auth.interceptor'
import {AuthService} from './services/auth.service'

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
]

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    FileUploadModule,
  ],
  declarations: [RegisterComponent, LoginComponent],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
