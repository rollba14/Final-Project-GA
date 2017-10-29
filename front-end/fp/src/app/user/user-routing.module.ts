import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';


const aboutRoutes: Routes = [
  {
    path: '',
    component: UserComponent,
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(aboutRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class UserRoutingModule { }
