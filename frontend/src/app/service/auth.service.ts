import { Injectable, inject } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { User } from '../Model/user';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Subject, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { LoginResponse } from '../Model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient = inject(HttpClient)
  router: Router = inject(Router)
  private readonly url = environment.api

private userLogined=new BehaviorSubject<boolean>(false)


  signUpAndloginService(formtype: string, user: User) {

    if (formtype == "Signup Form") {
      return this.http.post(`${this.url}/register`, user, { withCredentials: true })
        .pipe(map(response => {
          return response

        }),
          catchError((error) => {
            console.log("error response from backend", error.error);

            return throwError(() => error)
          })

        )
    }
    else {

      return this.http.post<LoginResponse>(`${this.url}/login`, user, { withCredentials: true })
        .pipe(map(LoginResponse => {
          const jwtToken = LoginResponse.token
          console.log(jwtToken);

          localStorage.setItem('jwt_user', jwtToken)
      
          
          this.router.navigate(['/task'])
          return LoginResponse
        }),
          catchError((error) => {
            console.log("error response from backend", error.error);

            return throwError(() => error)
          })

        )

    }


  }
  userLogOut(){
    // localStorage.removeItem('jwt_user')
    // this.userLogined.next(false)
    // this.router.navigate([''])
  }



}
