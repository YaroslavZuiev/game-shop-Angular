import {Component, inject, OnInit} from '@angular/core';
import {AsyncPipe, NgForOf} from "@angular/common";

import {Observable} from "rxjs";

import {CardComponent} from "../shared/card/card.component";
import {PostsService} from "../../services/posts.service";
import {PostModel} from "../../models/post.model";
import {CustomIfElseDirective} from "../../directives/custom-if-else.directive";
import {Router} from "@angular/router";

@Component({
  selector: 'app-posts',
  standalone: true,
  imports: [
    CardComponent,
    NgForOf,
    CustomIfElseDirective,
    AsyncPipe,
  ],
  templateUrl: './posts.component.html',
  styleUrl: './posts.component.scss'
})
export class PostsComponent implements OnInit {
  public posts$: Observable<PostModel[]>;

  private postsService = inject(PostsService);
  private router = inject(Router);

  public ngOnInit(): void {
    this.getAllPosts();
  }

  public async getPostDetails(post: PostModel): Promise<void> {
    await this.router.navigate(['dashboard/post-details'], {
      queryParams: {
        postId: post.id,
      }
    });
  }

  private getAllPosts(): void {
    this.posts$ = this.postsService.getAllPosts();
  }
}
