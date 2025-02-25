import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { environment } from '../../environment/environment';
import {jwtDecode}   from 'jwt-decode'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient:HttpClient) { }

  private readonly router = inject(Router) 
  userDate :any ="" ;
  sendRegisterForm(data:object) : Observable<any>{
   return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signup` ,
    data)
  }

  sendLoginForm(data:object) : Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/signin` 
      ,data
    )

  }
  getUserData():void{

   this.userDate = jwtDecode(localStorage.getItem('token') !)
   }

   logOut():void{
    localStorage.removeItem('token');
    this.userDate = null ;

    this.router.navigate(['/login'])

   }

   setEmailVerify(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords` , data)
   }

   setCodeVerify(data:object):Observable<any>{
    return this.httpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode` , data)
   }

   setRestPassword(data:object):Observable<any>{
    return this.httpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword` , data)
   }
}
