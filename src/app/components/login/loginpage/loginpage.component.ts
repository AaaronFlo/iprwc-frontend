import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';

@Component({
  selector: 'app-loginpage',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, HeaderComponent],
  templateUrl: './loginpage.component.html',
  styleUrl: './loginpage.component.css'
})
export class LoginpageComponent {
  loginForm: FormGroup;

  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    this.successMessage = null;
    this.errorMessage = null;

    if (this.loginForm.invalid) {
      return;
    }
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login(email, password).subscribe({
      next: (response) => {
        this.successMessage = 'Login successful!';
        this.loginForm.reset();
        if (response.role === 'ADMIN') {
          this.router.navigate(['/addProduct']);
      } else {
          this.router.navigate(['/products']);
      }
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });

    this.loginForm.reset();
  }
}
