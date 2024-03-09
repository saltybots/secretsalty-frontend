import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = () => {
  if (inject(AuthService).isLoggedIn()) {
    return true;
  } else {
    inject(Router).navigate(['home']);
    inject(ToastService).errorToast('Not logged in');
    return false;
  }
};
