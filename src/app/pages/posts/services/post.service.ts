import { HttpClient } from '@angular/common/http';
import { DestroyRef, inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, tap } from 'rxjs';
import { ENDPOINT } from '../../../shared/endpoint';
import { IPost, IPostPayload } from '../models/post.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  postsSub = new BehaviorSubject<IPost[]>([]);
  post$ = this.postsSub.asObservable();

  private destroy$ = inject(DestroyRef);

  get allPosts() {
    return this.postsSub.getValue();
  }
  constructor(private http: HttpClient) {}

  getAllPosts() {
    return this.http
      .get<IPost[]>(`${ENDPOINT.POSTS.get_posts}`)
      .pipe(
        map((response) => response),
        takeUntilDestroyed(this.destroy$)
      )
      .subscribe((response) => {
        this.postsSub.next(response);
      });
  }

  createPost(payload: IPostPayload) {
    return this.http.post<IPost>(`${ENDPOINT.POSTS.create_post}`, payload).pipe(
      map((post: IPost) => post),
      tap((post: IPost) => {
        const posts = this.postsSub.getValue();
        const allPosts = [...posts];
        this.postsSub.next([post, ...allPosts]);
      })
    );
  }

  editPost(postId: number, payload: IPostPayload) {
    const posts = this.allPosts;
    const postIndex = posts.findIndex((post) => post.id === postId);
    const newPosts = [...posts];
    newPosts[postIndex] = {
      ...posts[postIndex],
      ...payload,
    };

    return this.http.put(`${ENDPOINT.POSTS.edit_post(postId)}`, payload).pipe(
      map((response) => response),
      tap(() => this.postsSub.next(newPosts))
    );
  }
  deletePost(postId: number) {
    const posts = this.allPosts;
    const newPosts = [...posts].filter((post) => post.id !== postId);
    return this.http
      .delete(`${ENDPOINT.POSTS.delete_post(postId)}`)
      .pipe(tap(() => this.postsSub.next(newPosts)));
  }
}
