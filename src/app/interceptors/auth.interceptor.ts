import { HttpInterceptorFn } from '@angular/common/http';
import {inject} from "@angular/core";
import {Router} from "@angular/router";

export const authInterceptor: HttpInterceptorFn = (req, next, router = inject(Router)) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    req = req.clone({
      setHeaders: {
        ['x-auth-token']: `${token}`
      }
    });
  } else {
    router.navigate(['sign-in']).then();
  }
  return next(req);
};
