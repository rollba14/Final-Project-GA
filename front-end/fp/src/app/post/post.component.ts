import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PostService } from '../post/post.service'

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  title = "";
  description="";
  posts = [];
  editable;
  constructor(
    private postService: PostService,
  ) { }

  ngOnInit() {
  }


    // createPost(){
    //   let post ={
    //     title: this.title,
    //     description: this.description,
    //   }
    //   this.postService.createPost(this.loggedInUser,post)
    //   .subscribe((res)=>{
    //     this.posts.push(res.json());
    //   });
    // }
    //
    //
    //
    // toggleEditable(post_id){
    //   if(this.editable) this.editable = "";
    //   else this.editable = post_id;
    // }
    //
    // updatePost(post,title,description){
    //   console.log(post._id,title,description);
    //   var inputPost: any = {
    //     title: title,
    //     description: description,
    //   }
    //   this.postService.updatePost(post._id,inputPost)
    //   .subscribe((oldPost)=>{
    //     console.log('old post', oldPost.json());
    //
    //     let index = this.posts.findIndex(function(p){
    //       return p._id ==post._id;
    //     });
    //     this.posts[index].title = inputPost.title;
    //     this.posts[index].description = inputPost.description;
    //     console.log('new post is', this.posts[index])
    //     console.log('All posts are', this.posts)
    //     this.toggleEditable(this.posts[index]._id)
    //   });
    // }
    //
    // deletePost(post_id){
    //   console.log(post_id)
    //   this.postService.deletePost(post_id)
    //   .subscribe((post)=>{
    //     console.log(post.json());
    //     this.posts = post.json();
    //   });
    // }


}
