import { Component, DestroyRef, inject, Inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SharedModule } from '../../../../shared/shared.module';
import { IPost, IPostPayload } from '../../models/post.model';
import { PostService } from '../../services/post.service';

@Component({
  selector: 'pa-manage-post-modal',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './manage-post-modal.component.html',
  styleUrl: './manage-post-modal.component.scss',
})
export class ManagePostModalComponent {
  postForm!: FormGroup;
  isSetingUpPost!: boolean;
  apiError = {
    status: false,
    message: '',
  };
  modalTitle = 'Create Post';
  post?: IPost;

  private destroy$ = inject(DestroyRef);
  constructor(
    private modal: MatDialogRef<ManagePostModalComponent>,
    private fb: FormBuilder,
    private postService: PostService,
    @Inject(MAT_DIALOG_DATA) private data?: IPost
  ) {
    this.initForm();
    if (data) {
      this.post = this.data;
      this.modalTitle = 'Edit Post';
      this.prefillPostModal(this.post as IPost);
    }
  }

  initForm() {
    this.postForm = this.fb.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  get postFormData() {
    return this.postForm.controls;
  }

  onSubmit() {
    const payload: IPostPayload = {
      body: this.postFormData['body'].value,
      title: this.postFormData['title'].value,
      userId: 1,
    };
    if (this.post) {
      this.editPost(this.post.id, payload);
    } else {
      this.createPost(payload);
    }
  }

  createPost(payload: IPostPayload) {
    this.isSetingUpPost = true;
    this.postService
      .createPost(payload)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.isSetingUpPost = false;
            this.closeModal();
          }
        },
        error: (err) => {
          this.isSetingUpPost = false;
          this.apiError = {
            message: err,
            status: true,
          };
        },
      });
  }
  editPost(postId: number, payload: IPostPayload) {
    this.isSetingUpPost = true;
    this.postService
      .editPost(postId, payload)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe({
        next: (response) => {
          if (response) {
            this.isSetingUpPost = false;
            this.closeModal();
          }
        },
        error: (err) => {
          this.isSetingUpPost = false;
          this.apiError = {
            message: err,
            status: true,
          };
        },
      });
  }

  prefillPostModal(post: IPost) {
    this.postForm.patchValue({
      title: post.title,
      body: post.body,
    });
  }

  closeModal(data?: IPost) {
    if (data) {
      this.modal.close(data);
    } else {
      this.modal.close();
    }
  }
}
