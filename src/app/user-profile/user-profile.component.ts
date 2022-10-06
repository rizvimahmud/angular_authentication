import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup} from '@angular/forms'
import {AuthService} from '../auth/services/auth.service'
import {User} from '../auth/types/user.interface'

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  user: User | null = null
  previewImage!: string
  constructor(public authService: AuthService) {}

  uploadForm = new FormGroup({
    avatar: new FormControl(null),
  })

  ngOnInit(): void {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user
    })
  }

  onSelectImage(event: any) {
    //@ts-ignore
    const file = event.files[0]
    this.uploadForm.patchValue({
      //@ts-ignore
      avatar: file,
    })
    const reader = new FileReader()
    reader.onload = () => {
      this.previewImage = reader.result as string
    }
    reader.readAsDataURL(file)
  }

  updateProfilePicture() {
    console.log('uploading...')
  }

  clearImageField(event: any) {
    console.log(event)
  }
}
