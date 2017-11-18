import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CommentService {
  // Could make the baseUrl "https://glacial-chamber-79751.herokuapp.com/api/comment/"
  private baseUrl = "https://glacial-chamber-79751.herokuapp.com";

  constructor(private http: Http) { }

  addComment(post_id,comment){
    return this.http.post(`${this.baseUrl}/api/posts/${post_id}/comment`,comment, {withCredentials: true});
  }

  deleteSubComment(post_id,comment_id){
    return this.http.delete(`${this.baseUrl}/api/posts/${post_id}/comment/${comment_id}`,{withCredentials: true});
  }

  updateSubComment(post_id,comment_id,content){
    return this.http.put(`${this.baseUrl}/api/posts/${post_id}/comment/${comment_id}`,content,{withCredentials: true});
  }


}
