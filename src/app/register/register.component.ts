import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'
import {Router} from '@angular/router'
import {AuthService} from '../shared/auth.service'
import {CustomValidators} from '../shared/custom-validator'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  loading: boolean = false
  errorResponse: string | null = null
  registerForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/i),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl(''),
      role: new FormControl(''),
    },
    [CustomValidators.MatchValidator('password', 'confirmPassword')]
  )

  constructor(public authService: AuthService, public router: Router) {}

  ngOnInit(): void {}

  registerUser() {
    this.loading = true
    const payload = {
      name: this.registerForm.controls['name']
        .value!.split(' ')
        .map((char) => char[0].toUpperCase() + char.slice(1))
        .join(' '),
      email: this.registerForm.controls['email'].value!,
      password: this.registerForm.controls['password'].value!,
      role: this.registerForm.controls['role'].value!,
    }

    this.authService.signUp(payload).subscribe({
      next: (_) => {
        this.loading = false
        this.registerForm.reset()
        this.router.navigate(['/login'])
      },
      error: (err) => {
        this.errorResponse = err.message
        this.loading = false
      },
    })
  }
}
