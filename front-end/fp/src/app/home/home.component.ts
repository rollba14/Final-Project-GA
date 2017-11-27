import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
   loggedInUser:any = "";
  flashMsg;
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.userService.getSessionUser()
    .subscribe(user=>{
      this.loggedInUser = user.json();
    },err=>{
      console.log('User is not signed in');
    })
  }

  logout(e){
    e.preventDefault();
    this.flashMsg = "You have succssfully logged out.";
    this.userService.logout()
    .subscribe(res=>{
      this.loggedInUser = "";
      this.flashMsg = "You have succssfully logged out.";
      console.log("You have succssfully logged out.");
    },err=>{
      this.flashMsg = "There's an error logging out";
    });
  }

}
