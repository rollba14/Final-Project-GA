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
  tempLoginUsername = "";
  tempLoginPassword = "";
  registerUsername = "";
  registerPassword = "";
  loggedInUser = "";
  title = "";
  description="";
  posts = [];
  editable;
  flashMsg= "";

  constructor(
    // private route: ActivatedRoute,
    private userService: UserService,
    private postService: PostService,
  ) { }

  ngOnInit() {
    this.userService.getSessionUser()
    .subscribe(user=>{
      this.loggedInUser = user.json();
    },err=>{
      console.log('User is not signed in');
    })
  }

  registerUser(username,password){
    this.userService.registerUser(username,password).subscribe(
      (res)=>{
        this.userService.getSessionUser().subscribe(data=>{
          this.loggedInUser = data.json();
          console.log('response from signup is', data);
        });
        this.registerUsername = "";
        this.registerPassword = "";
    },(err)=>{
      console.log('Error');
      window.alert('Username could be taken');
    });
  }

  logout(){
    this.flashMsg = "You have succssfully logged out.";
    this.userService.logout()
    .subscribe(res=>{
      this.loggedInUser = "";
      this.flashMsg = "You have succssfully logged out.";
    },err=>{
      this.flashMsg = "There's an error logging out";
    });
  }

  loginUser(username,password){
    let inputUser = {
      username : username,
      password : password,
    }
    console.log('new user is ', inputUser);
    this.userService.loginUser(inputUser).subscribe(
      (res)=>{
      console.log('succssfully logged in');

      this.userService.getSessionUser().subscribe(data=>{
        this.loggedInUser = data.json();
        this.flashMsg = "Welcome!";
      });
      this.tempLoginUsername = "";
      this.tempLoginPassword = "";
    },(err)=>{
      console.log('err is', err);
      this.tempLoginUsername = "";
      this.tempLoginPassword = "";
      window.alert('Invalid credentials');
    });
  }

}
