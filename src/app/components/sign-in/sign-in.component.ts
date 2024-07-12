import {Component, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AuthorizationService} from "../../services/authorization.service";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [MatFormFieldModule, MatIconModule, MatInputModule, MatButtonModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit{
  public hidePassword = signal<boolean>(true);
  public errorMessage = signal('');
  public formGroup: FormGroup;

  private router = inject(Router);
  private authService = inject(AuthorizationService);

  public get emailControl(): FormControl {
    return this.formGroup.get('email') as FormControl;
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public togglePasswordVisibility(event: MouseEvent): void {
    event.stopPropagation();
    this.hidePassword.set(!this.hidePassword());
  }

  public updateErrorMessage(): void {
    if (this.formGroup.get('email').hasError('required')) {
      this.errorMessage.set('Email field is required');
    } else if (this.formGroup.get('email').hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  public async signUp(): Promise<void> {
    this.formGroup.reset();
    await this.router.navigate(['sign-up']);
  }

  public onSubmit(): void {
    const formData = this.formGroup.getRawValue();
    this.authService.signIn(formData).subscribe({
      next: async (data) => {
        localStorage.setItem('access_token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        await this.router.navigate(['dashboard/posts']);
      },
      error: (err) => {}
    })
  }

  private initForm(): void {
    this.formGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }
}
