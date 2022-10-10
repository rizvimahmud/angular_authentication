import { Component, OnDestroy, OnInit } from '@angular/core'
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from '../../services/auth.service'
import { UserSignupRequest } from '../../types/userSignupRequest.interface'
import { capitalizeUserName } from '../../utils/capitalizeUserName'
import { CustomValidators } from '../../utils/customValidator'

@Component({
  selector: 'auth-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnDestroy {
  loading: boolean = false
  errorMessage: string | null = null
  previewImage!: string
  signUpSbscription: Subscription | undefined

  registerForm = new FormGroup(
    {
      name: new FormControl('', [
        Validators.required,
        Validators.pattern(/^[a-zA-Z ]+$/i),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      avatar: new FormControl(null),
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

  ngOnDestroy(): void {
    this.signUpSbscription?.unsubscribe()
  }

  onImageFileChange(event: any) {
    // @ts-ignore
    const file = event.files[0]
    this.registerForm.patchValue({
      // @ts-ignore
      avatar: file,
    })
    this.registerForm.get('avatar')?.updateValueAndValidity()

    // const reader = new FileReader()
    // reader.onload = () => {
    //   this.previewImage = reader.result as string
    // }
    // reader.readAsDataURL(file)
  }

  registerUser() {
    this.loading = true
    const formData = new FormData()
    formData.append(
      'name',
      capitalizeUserName(this.registerForm.controls['name'].value!)
    )
    formData.append('email', this.registerForm.controls['email'].value!)
    formData.append('password', this.registerForm.controls['password'].value!)
    formData.append('role', this.registerForm.controls['role'].value!)
    formData.append('avatar', this.registerForm.controls['avatar'].value!)
    this.signUpSbscription = this.authService
      .signUp(formData as any)
      .subscribe({
        next: (_) => {
          this.loading = false
          this.registerForm.reset()
          this.router.navigate(['/login'])
        },
        error: (err) => {
          this.errorMessage = err.message
          this.loading = false
        },
      })
  }
  cancelAvatarUpload() {
    this.registerForm.controls['avatar'].reset()
    this.previewImage = ''
  }
}
