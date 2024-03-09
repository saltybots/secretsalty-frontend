import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  config = {
    extendedTimeOut: 20000,
  }

  constructor(private toaster: ToastrService) { }

  infoToast(title: string, message?: string) {
    this.toaster.info(message, title, this.config);
  }

  successToast(title: string, message?: string) {
    this.toaster.success(message, title, this.config);
  }

  errorToast(title: string, message?: string) {
    this.toaster.error(message, title, this.config);
  }
}
