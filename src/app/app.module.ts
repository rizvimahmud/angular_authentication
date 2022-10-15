import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { HttpClientModule } from '@angular/common/http'

import { AuthModule } from './auth/auth.module'
import { AppRoutingModule } from './app-routing.module'

import { AppComponent } from './app.component'
import { UserProfileComponent } from './user-profile/user-profile.component'
import { FilterComponent } from './filter/filter.component'
import { SearchComponent } from './search/search.component'
import { DashbaordComponent } from './dashbaord/dashboard.component'
import { NavigationComponent } from './navigation/navigation.component'

import { ClickOutsideDirective } from './shared/click-outside.directive'

import { FileUploadModule } from 'primeng/fileupload'
import { InputTextModule } from 'primeng/inputtext'
import { TableModule } from 'primeng/table'
import { DropdownModule } from 'primeng/dropdown'
import { AvatarModule } from 'primeng/avatar'

@NgModule({
  declarations: [
    AppComponent,
    UserProfileComponent,
    ClickOutsideDirective,
    FilterComponent,
    DashbaordComponent,
    NavigationComponent,
    SearchComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AuthModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule,
    InputTextModule,
    TableModule,
    DropdownModule,
    AvatarModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
