import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";

import {PostModel} from "../models/post.model";
import {baseUrlCont} from "../constants/baseUrl.cont";

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private http = inject(HttpClient);

  public getAllPosts(): Observable<PostModel[]> {
    return this.http.get<PostModel[]>(`${baseUrlCont}/posts`);
  }

  public createPost(body: FormData): Observable<PostModel[]> {
    return this.http.post<PostModel[]>(`${baseUrlCont}/create-post`, body)
  }

  public getPostDetails(postId: number): Observable<PostModel> {
    return this.http.get<PostModel>(`${baseUrlCont}/posts/post-details?postId=${postId}`);
  }
}
