import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NguiMapModule } from '@ngui/map';

import { PostComponent } from './post.component';
import { PostService } from './post.service'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NguiMapModule,
  ],
  declarations: [PostComponent],
  providers: [PostService],
  exports: [PostComponent],
})
export class PostModule { }
