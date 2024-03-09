import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss'
})
export class UserProfileComponent implements OnInit{

  constructor(private authService: AuthService) {
    this.user = this.authService.getCurrentUser();
  }

  user = this.authService.getCurrentUser();
  photoURL: string = 'assets/images/NyanCat.gif';

  ngOnInit(): void {
    console.log(this.user)
    console.log(this.user?.photoURL)
    if (this.user && this.user.photoURL) {
      this.photoURL = this.user.photoURL;
    }
  }
}
