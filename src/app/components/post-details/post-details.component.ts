import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AsyncPipe, NgIf} from "@angular/common";

import {Observable} from "rxjs";

import {PostModel} from "../../models/post.model";
import {PostsService} from "../../services/posts.service";

@Component({
  selector: 'app-post-details',
  standalone: true,
  imports: [
    AsyncPipe,
    NgIf
  ],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {
  public post$: Observable<PostModel>;

  private postsService = inject(PostsService);
  private route = inject(ActivatedRoute);

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      this.post$ = this.postsService.getPostDetails(params['postId']);
    })
  }
}
