import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';

import { ActivatedRoute }   from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username="";
  password="";
  loggedInUser = "";
  title = "";
  description="";
  posts = [];
  editable;

  constructor(
    // private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
  ) { }

  ngOnInit() {
    // this.route.params.forEach( param => {
    //   console.log('param is', param);
    //
    // });
  }

  registerUser(){
    let newUser = {
      username : this.username,
      password : this.password,
    }
    console.log('registering');
    this.userService.registerUser(newUser).subscribe((user)=>{
      console.log(user.json());
      this.loggedInUser = user.json();
    });
  }

  loginUser(){
    let inputUser = {
      username : this.username,
      password : this.password,
    }
    console.log('new user is ', inputUser);
    this.userService.loginUser(inputUser).subscribe((res)=>{
      console.log('res is ', res);
      // console.log(res.json());
      // if(res.json().length >0 ){
      //   this.loggedInUser = res.json()[0];
      //   this.postService.getUserPosts(this.loggedInUser)
      //   .subscribe((posts)=>{
      //     console.log(posts.json());
      //     this.posts = posts.json();
      //   })
      // }
      // console.log(this.editable);
    });
  }

}
