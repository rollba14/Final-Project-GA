import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PostService {
  private baseUrl = "https://glacial-chamber-79751.herokuapp.com/";
  private allPosts = "";
  constructor(private http: Http) {
    // this.getAllPosts().subscribe(res=>{
    //   this.allPosts = res.json();
    // })
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
