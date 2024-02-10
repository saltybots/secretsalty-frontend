import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../authentication/auth.service';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private toaster: ToastService,
              private router: Router) {}

  emailInput: string = '';
  passInput: string = '';
  displayNameInput: string = '';
  lastResponse: string = '';

  ngOnInit() {}

  toast() {
    // TODO just to test, can be removed
    this.toaster.infoToast('Info');
  }

  goToProfile() {
    // TODO just to test, can be removed
    this.router.navigate(['profile']);
  }

  createAccount() {
    this.authService.createAccountEmailAndPass(this.emailInput, this.passInput);
  }

  login() {
    this.authService.loginEmailAndPass(this.emailInput, this.passInput);
  }

  google() {
    this.authService.googleSignUp();
  }

  signUserOut() {
    this.authService.logout();
  }

  updateName() {
    this.authService.updateDisplayName(this.displayNameInput);
  }

  getCurrentUserInfoString() {
    const user = this.authService.getCurrentUser();
    if (user) {
      return "\n" +
        'uuid: ' + user.uid + "\n" +
        'email: ' + user.email + "\n" +
        'displayName: ' + user.displayName + "\n" +
        'creationTime: ' + user.metadata.creationTime + "\n" +
        'lastSignInTime: ' + user.metadata.lastSignInTime + "\n" +
        'hasVerifiedEmail: ' + user.emailVerified + "\n" +
        'providerId: ' + user.providerId + "\n" +
        'photoURL: ' + user.photoURL
    }
    return 'not logged in.';
  }

  async talkWithBackend() {
    const tokenHeader = await this.authService.getTokenHeader();
    if (tokenHeader) {
      const headers = new HttpHeaders({
        'Authorization': 'Bearer ' + tokenHeader
      })

      this.httpClient.get('http://localhost:8080/app/test', {headers: headers, responseType: 'text'})
        .subscribe((data) => {
          console.log('returned: ' + data)
          this.lastResponse = data;
        })
    } else {
      this.lastResponse = 'how about logging in first?';
    }
  }
}
