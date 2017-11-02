import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommentService } from './comment.service'


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [],
  providers: [CommentService]
})
export class CommentModule { }
