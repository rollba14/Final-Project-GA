import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class UserService {
  baseUrl = "http://localhost:3000";
  constructor(private http: Http) { }

  registerUser(newUser){
    console.log(newUser);
    return this.http.post(`${this.baseUrl}/api/users`, newUser);
  }

  loginUser(inputUser){
    return this.http.post(`${this.baseUrl}/api/users/login`, inputUser);
  }

  createPost(user, post){
    post.user_id = user._id
    console.log('submitting post', post, 'for user ', user);
    return this.http.post(`${this.baseUrl}/api/posts`,post);
  }

}
