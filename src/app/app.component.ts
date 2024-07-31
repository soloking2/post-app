import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PostService } from './pages/posts/services/post.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'pa-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'posts-app';
  constructor(private postservice: PostService,
    private meta: Meta,
    private titleService: Title
  ) {
    this.postservice.getAllPosts();
    this.titleService.setTitle(this.title)
    this.meta.updateTag({ name: 'description', content: 'A post app' });
  }
}
