import { Component, DestroyRef, inject } from '@angular/core';
import { BlogService } from '../../util/blog.service';
import { ButtonComponent } from '../../components/button/button.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxCaptchaModule } from 'ngx-captcha';
import { environment } from '../../../environments/environment';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  public siteKey = environment.siteKey;

  public commentForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required, Validators.maxLength(256)]),
    captcha: new FormControl('', [Validators.required]),
  });

  postComment(): void {
    const email = this.commentForm.value.email;
    const message = this.commentForm.value.message;
    this.blogService
      .postComment(email, message)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.snackBar
          .open('❤️ Your message has been sent!', 'OK', { duration: 2000 })
          .afterOpened()
          .subscribe(() => {
            this.router.navigate(['/']);
          });
      });
  }

  handleReset(): void {}
  handleExpire(): void {}
  handleLoad(): void {}
  handleSuccess(e: any): void {}
}
