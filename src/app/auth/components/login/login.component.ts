import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {AuthService} from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loading: boolean = false
  errorResponse: string | null = null

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {}

  loginUser() {
    this.loading = true
    const payload = {
      email: this.loginForm.controls['email'].value!,
      password: this.loginForm.controls['password'].value!,
    }
    this.authService.login(payload).subscribe({
      next: (_) => {
        this.loading = false
        this.loginForm.reset()
        this.router.navigate(['/user-profile'])
      },
      error: (err) => {
        this.errorResponse = err.message
        this.loading = false
      },
    })
  }
}
