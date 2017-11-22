import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions  } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { AppService } from '../app.service';


@Injectable()
export class CommentService {
  private baseUrl = "";
  private allPosts = "";

  constructor(private http: Http,  private appService: AppService) {
    this.baseUrl = appService.getBaseUrl();
  }

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
