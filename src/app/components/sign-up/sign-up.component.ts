import {Component, inject, OnInit, signal} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";

import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {AuthorizationService} from "../../services/authorization.service";

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss'
})
export class SignUpComponent implements OnInit {
  public form:FormGroup;
  public errorMessage = signal('');
  public hidePassword = signal<boolean>(true);

  private authService = inject(AuthorizationService);
  private router = inject(Router);

  public get emailControl(): FormControl {
    return this.form.get('email') as FormControl;
  }

  public ngOnInit():void {
    this.initForm();
  }

  public onSubmit(): void {
    const formData = this.form.getRawValue();
    this.authService.signUp(formData).subscribe({
      next: async () => {
        await this.router.navigate(['sign-in']);
      },
      error: (err) => {
        //TODO add error toast
      }
    })
  }

  public updateErrorMessage(): void {
    if (this.form.get('email').hasError('required')) {
      this.errorMessage.set('Email field is required');
    } else if (this.form.get('email').hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }

  public togglePasswordVisibility(event: MouseEvent): void {
    this.hidePassword.set(!this.hidePassword());
    event.stopPropagation();
  }

  private initForm(): void {
    this.form = new FormGroup({
      firstName: new FormControl<string>('', [Validators.required]),
      lastName: new FormControl<string>('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    })
  }
}
