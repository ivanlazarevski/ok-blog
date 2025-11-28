import { Component, DestroyRef, inject } from '@angular/core';
import { BlogService } from '../../util/blog.service';
import { ButtonComponent } from '../../components/button.component/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxCaptchaModule } from 'ngx-captcha';


export type CommentData = {
  email: string;
  message: string;
};

@Component({
  selector: 'contact-page',
  imports: [ButtonComponent, ReactiveFormsModule, NgxCaptchaModule],
  templateUrl: './contact-page.component.html',
  styleUrl: './contact-page.component.css',
})
export class ContactPageComponent {
  public readonly blogService = inject(BlogService);
  public readonly destroyRef = inject(DestroyRef);
  private readonly snackBar = inject(MatSnackBar);
  public readonly router = inject(Router);
  protected siteKey = '<KEY>';

  public commentForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    captcha: new FormControl('', [Validators.required]),

  });

  postComment(): void {

  }

  handleReset(): void {}
  handleExpire(): void {}
  handleLoad(): void {}
  handleSuccess(e: any): void {}
}
