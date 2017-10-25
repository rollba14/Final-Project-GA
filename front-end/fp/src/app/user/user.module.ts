import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UserComponent } from './user.component';
import { UserService } from './user.service'

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [UserComponent],
  providers: [UserService],
  exports: [UserComponent],
})
export class UserModule { }
