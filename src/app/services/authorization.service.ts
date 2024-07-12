import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {Observable} from "rxjs";

import {SignInModel} from "../models/sign-in.model";
import {baseUrlCont} from "../constants/baseUrl.cont";
import {SignUpModel} from "../models/sign-up.model";
import {UserModel} from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {
  private http = inject(HttpClient);

  public signIn(signUp: SignInModel): Observable<{ token: string, user: UserModel }> {
    return this.http.post<{ token: string, user: UserModel }>(`${baseUrlCont}/sign-in`,signUp)
  }

  public signUp(signUp: SignUpModel): Observable<void> {
    return this.http.post<void>(`${baseUrlCont}/sign-up`,signUp)
  }
}
