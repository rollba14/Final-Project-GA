import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service'


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  username="";
  password="";
  loggedInUser = "";
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
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

      console.log(res.json());
      if(res.json().length >0 )
      this.loggedInUser = res.json()[0];
    });
  }

}
