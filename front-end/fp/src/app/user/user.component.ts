import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../user/user.service';
import { PostService } from '../post/post.service';



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
    private userService: UserService,
    private postService: PostService,
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
      if(res.json().length >0 ){
        this.loggedInUser = res.json()[0];
        this.postService.getUserPosts(this.loggedInUser)
        .subscribe((posts)=>{
          console.log(posts.json());
          this.posts = posts.json();
        })
      }
      console.log(this.editable);
    });
  }

  createPost(){
    let post ={
      title: this.title,
      description: this.description,
    }
    this.postService.createPost(this.loggedInUser,post)
    .subscribe((res)=>{
      this.posts.push(res.json());
    });
  }



  toggleEditable(post_id){
    if(this.editable) this.editable = "";
    else this.editable = post_id;
  }

  updatePost(post,title,description){
    console.log(post._id,title,description);
    var inputPost: any = {
      title: title,
      description: description,
    }
    this.postService.updatePost(post._id,inputPost)
    .subscribe((oldPost)=>{
      console.log('old post', oldPost.json());

      let index = this.posts.findIndex(function(p){
        return p._id ==post._id;
      });
      this.posts[index].title = inputPost.title;
      this.posts[index].description = inputPost.description;
      console.log('new post is', this.posts[index])
      console.log('All posts are', this.posts)
      this.toggleEditable(this.posts[index]._id)
    });
  }

  deletePost(post_id){
    console.log(post_id)
    this.postService.deletePost(post_id)
    .subscribe((post)=>{
      console.log(post.json());
      this.posts = post.json();
    });
  }

}
