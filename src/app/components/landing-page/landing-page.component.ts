import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../authentication/auth.service';
import { ToastService } from '../../services/toast.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent implements OnInit {

  constructor(private authService: AuthService) {}

  emailInput: string = '';
  passInput: string = '';

  ngOnInit() {}

  createAccount() {
    this.authService.createAccountEmailAndPass(this.emailInput, this.passInput);
  }

  google() {
    this.authService.googleSignUp();
  }
}
