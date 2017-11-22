import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../app.service';


@Injectable()
export class UserService {
  private baseUrl = "";

  isloggedIn = new Subject();
  loginUpdate = false;
  constructor(private http: Http, private appService: AppService
  ) {
    this.baseUrl = appService.getBaseUrl();
  }

  getSessionUser(){

    return this.http.get(`${this.baseUrl}/login/user`,
    {withCredentials: true});

  }

  registerUser(username, pw){
    return this.http.post(`${this.baseUrl}/signup`,
      {username: username,
        password: pw,},
        {withCredentials: true});
  }

  loginUser(inputUser){
    return this.http.post(`${this.baseUrl}/login`,
      {username: inputUser.username, password: inputUser.password},
      {withCredentials: true});
  }
  logout(){
    return this.http.get(`${this.baseUrl}/logout`,
      {withCredentials: true});
  }
}
