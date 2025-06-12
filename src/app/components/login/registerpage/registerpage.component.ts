import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-registerpage',
  imports: [CommonModule, ReactiveFormsModule, RouterModule ,HeaderComponent],
  templateUrl: './registerpage.component.html',
  styleUrl: './registerpage.component.css'
})
export class RegisterpageComponent {
  registerForm: FormGroup;
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private authService: AuthService, private fb: FormBuilder) { 
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      role: ['USER', Validators.required]
    });
  }

  onRegister(){
    this.successMessage = null;
    this.errorMessage = null;

    if (this.registerForm.invalid) {
      return;
    }
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;
    const role = this.registerForm.get('role')?.value;

    this.authService.signup(email, password, role).subscribe({
      next: (response) => {
        this.successMessage = 'Registration successful!';
        this.registerForm.reset();
      },
      error: (error) => {
        this.errorMessage = error;
      }
    });
  }
}



