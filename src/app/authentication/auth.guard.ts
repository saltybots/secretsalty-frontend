import { CanActivateFn, Router} from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { ToastService } from '../services/toast.service';

export const authGuard: CanActivateFn = async () => {
  let auth = inject(AuthService)
  let toast = inject(ToastService)
  let router = inject(Router)

  if (await auth.isLoggedIn()) {
    return true;
  } else {
    toast.errorToast('Not logged in!');
    await router.navigate(['home']);
    return false;
  }
};
