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
    this.userService.getSessionUser()
    .subscribe(user=>{
      console.log('User was logged in');
      this.loggedInUser = user.json().username;
    },err=>{
      console.log('User is not signed in');
    })
  }

  registerUser(){
    this.userService.registerUser(this.username,this.password).subscribe(
      (res)=>{
      console.log(res);
      this.loggedInUser = this.username;
      this.username = "";
    },(err)=>{
      console.log('Error');
      window.alert('Username could be taken');
    });
  }

  loginUser(){
    let inputUser = {
      username : this.username,
      password : this.password,
    }
    console.log('new user is ', inputUser);
    this.userService.loginUser(inputUser).subscribe(
      (res)=>{
      console.log('succssfully logged in');
      this.loggedInUser = this.username;
      this.username = "";
    },(err)=>{
      console.log('err is', err);
      this.username = "";
      this.password = "";
      window.alert('Invalid credentials');
    });
  }

}
