import {
  Component,
  DestroyRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, tap } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';
import { IPost, IPostTable } from './models/post.model';
import { PostService } from './services/post.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ManagePostModalComponent } from './components/manage-post-modal/manage-post-modal.component';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'pa-posts',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss',
})
export class PostsComponent implements OnInit {
  posts$!: Observable<IPost[]>;
  POST_TABLE_DATA!: IPostTable[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  postTableDataSource: MatTableDataSource<IPostTable> =
    new MatTableDataSource();
  displayColumns = ['title', 'body', 'action'];

  managePostModal = ManagePostModalComponent;

  private destroy$ = inject(DestroyRef);

  constructor(private postService: PostService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.posts$ = this.postService.post$.pipe(
      tap((response) => {
        this.populatePostTable(response);
      })
    );
  }

  populatePostTable(posts: IPost[]) {
    this.POST_TABLE_DATA = posts?.map((post) => ({
      title: post.title,
      body: post.body,
      action: post,
    }));
    this.postTableDataSource = new MatTableDataSource<IPostTable>(
      this.POST_TABLE_DATA
    );
    this.postTableDataSource.paginator = this.paginator;
  }

  openDialog(data?: IPost) {
    this.dialog.open(this.managePostModal, {
      data,
      width: '480px',
    });
  }

  deletePost(data: IPost) {
    this.postService
      .deletePost(data.id)
      .pipe(takeUntilDestroyed(this.destroy$))
      .subscribe(() => {});
  }
}
