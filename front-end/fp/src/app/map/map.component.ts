import { Component, OnInit,ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';

// This is not being used yet because is difficult to separate both posts
// and map logic. Markers live on map so more reasonable to put both
// posts and map on post component.

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  private title = "";
  private description="";
  private posts = [];
  private editable;

  private loggedInUser;
  constructor(
    private userService: UserService,
    private postService: PostService,
  ) { }

  ngOnInit() {
    // Ideally, set the loggedInUser here from token or something
    // but now is hardcoded for progressing purposes
    // this.loggedInUser = {
    //   _id: "59efe6936335d40c9be46ffc",
    //   username: "asd",
    //   password: "123",
    // }
  }



}
