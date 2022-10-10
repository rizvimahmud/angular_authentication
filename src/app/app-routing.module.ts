import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { AuthGuard } from './auth/guards/auth.guard'
import { RoleGuard } from './auth/guards/role.guard'
import { DashbaordComponent } from './dashbaord/dashboard.component'
import { UserProfileComponent } from './user-profile/user-profile.component'

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/user-profile' },
  {
    path: 'dashboard',
    component: DashbaordComponent,
    canActivate: [RoleGuard],
  },
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
