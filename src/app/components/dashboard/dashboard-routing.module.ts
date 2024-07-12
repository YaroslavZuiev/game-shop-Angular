import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {DashboardComponent} from "./dashboard.component";

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'posts',
        loadComponent: () => import('../posts/posts.component').then(c => c.PostsComponent),
      },
      {
        path: 'create-post',
        loadComponent: () => import('../create-post/create-post.component').then(c => c.CreatePostComponent),
      },
      {
        path: 'post-details',
        loadComponent: () => import('../post-details/post-details.component').then(c => c.PostDetailsComponent),
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
