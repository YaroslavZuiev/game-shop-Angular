import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";

import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {MatButton} from "@angular/material/button";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-create-post',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatError,
    MatFormField,
    MatInput,
    MatLabel,
    CdkTextareaAutosize,
    MatButton,
    NgIf
  ],
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent implements OnInit {
  @ViewChild('file') public file: ElementRef<HTMLInputElement>;

  public form: FormGroup;
  public previewUrl: string | ArrayBuffer | null = '';

  private postService = inject(PostsService);

  public ngOnInit(): void {
    this.initForm();
  }


  public previewFile(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files.length > 0) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const blob = new Blob([reader.result], {type: file.type});
        this.previewUrl = reader.result as string;
        this.form.get('image').patchValue(blob);
      };
      reader.readAsDataURL(file);
    }
  }

  public onSubmit(): void {
    const body = this.form.getRawValue();
    const formData = new FormData();
    Object.entries(body).forEach(([key, value]) => {
      formData.append(key, value as string | Blob)
    })
    this.postService.createPost(formData).subscribe({
      next:  () => {
        console.log('Post successfully created');
      }
    })
  }

  private initForm(): void {
    const user = JSON.parse(localStorage.getItem('user'));
    this.form = new FormGroup({
      title: new FormControl<string>('', Validators.required),
      description: new FormControl<string>('', Validators.required),
      image: new FormControl<string>('', Validators.required),
      price: new FormControl<number>(null),
      userId: new FormControl<number>(user.id),
    });
  }
}
