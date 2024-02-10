import { inject, Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup, signOut, updateProfile
} from '@angular/fire/auth';
import { ToastService } from '../services/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth = inject(Auth);
  googleProvider = new GoogleAuthProvider();

  constructor(private toaster: ToastService) {  }

  createAccountEmailAndPass(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((credentials) => {
        this.toaster.successToast('Signed up', 'as ' + credentials.user.email);
      })
      .catch((error) => {
        this.toaster.errorToast(error.code, error.message);
      });
  }

  googleSignUp() {
    signInWithPopup(this.auth, this.googleProvider)
      .then((result) => {
        this.toaster.successToast('Signed up', 'with Google account ' + result.user.email);

      }).catch((error) => {
      this.toaster.errorToast(error.code, error.message);
    });
  }

  loginEmailAndPass(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((credentials) => {
        this.toaster.successToast('Logged in', 'as ' + credentials.user.email);
      })
      .catch((error) => {
        this.toaster.errorToast(error.code, error.message);
      });
  }

  logout() {
    signOut(this.auth).then(() => {
      this.toaster.successToast('Logged out successfully');
    })
      .catch(() => {
        this.toaster.errorToast('Could not log out');
      });
  }

  updateDisplayName(displayName: string) {
    if (this.auth.currentUser) {
      updateProfile(this.auth.currentUser, {
        displayName: displayName
      }).then(() => {
        this.toaster.successToast('Updated name successfully');
      }).catch(() => {
        this.toaster.errorToast('Could not update display name');
      });
    }
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  getTokenHeader() {
    if (this.auth.currentUser) {
      return this.auth.currentUser.getIdToken()
        .then(token => {
          return token;
        });
    }
    console.error("not logged in.");
    return null;
  }

  isLoggedIn(): boolean {
    return this.auth.currentUser != null;
}
}
