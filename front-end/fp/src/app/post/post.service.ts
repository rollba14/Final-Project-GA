import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../app.service';

@Injectable()
export class PostService {
  private baseUrl = "";
  private allPosts = "";

  constructor(private http: Http, private appService: AppService) {
    this.baseUrl = appService.getBaseUrl();
  }

  getAllPosts(){
    return this.http.get(`${this.baseUrl}/api/posts`);
  }

  createPost(post){
    return this.http.post(`${this.baseUrl}/api/posts`,post,{withCredentials: true});
  }

  getUserPosts(user){
      return this.http.get(`${this.baseUrl}/api/posts/user/${user._id}`);
  }

  deletePost(post_id){
    return this.http.delete(`${this.baseUrl}/api/posts/${post_id}`,{withCredentials: true});
  }

  updatePost(post){
    return this.http.put(`${this.baseUrl}/api/posts/${post._id}`,post,{withCredentials: true});
  }

}
