import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    const user = JSON.parse(localStorage.getItem("user")!);
    let token;
    if (user!=null) {
      token = user.token;
      console.log(token);

    }

    if (token) {
      const authReq = req.clone({
        url: req.url.concat(`?auth=${token}`)
      })
      return next.handle(authReq)
    }
    return next.handle(req)
  }
}
