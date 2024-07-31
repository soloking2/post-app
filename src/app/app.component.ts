import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostService } from './pages/posts/services/post.service';

@Component({
  selector: 'pa-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'posts-app';
  constructor(private postservice: PostService) {
    this.postservice.getAllPosts();
  }
}
