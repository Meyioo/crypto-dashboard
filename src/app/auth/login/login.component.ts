import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, ReactiveFormsModule],
  standalone: true,
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  public loginFailed = false;

  loginForm = this.fb.nonNullable.group({
    password: ['', [Validators.required]],
  });

  onSubmit() {
    if (this.authService.login(this.loginForm.value.password!)) {
      this.router.navigate(['/dashboard']);
    } else {
      this.loginFailed = true;
    }
  }
}
