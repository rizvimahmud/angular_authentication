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
  previewImage!: string
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

  ngOnInit(): void {}

  onImageFileChange(event: any) {
    //@ts-ignore
    const file = (event.target as HTMLInputElement).files[0]
    this.registerForm.patchValue({
      //@ts-ignore
      avatar: file,
    })
    this.registerForm.get('avatar')?.updateValueAndValidity()

    const reader = new FileReader()
    reader.onload = () => {
      this.previewImage = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  registerUser() {
    this.loading = true
    const formData = new FormData()
    formData.append(
      'name',
      this.registerForm.controls['name']
        .value!.split(' ')
        .map((char) => char[0].toUpperCase() + char.slice(1))
        .join(' ')
    )
    formData.append('email', this.registerForm.controls['email'].value!)
    formData.append('password', this.registerForm.controls['password'].value!)
    formData.append('role', this.registerForm.controls['role'].value!)
    formData.append('avatar', this.registerForm.controls['avatar'].value!)

    this.authService.signUp(formData as any).subscribe({
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
