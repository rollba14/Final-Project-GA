import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { UserComponent } from './user/user.component';
import { PostComponent } from './post/post.component';

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'post',
        component: PostComponent
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
      path: 'user',
      component: UserComponent
    },
    {
      path: 'api/posts',
      component: PostComponent
    },
    {
      path: 'login/user',
      component: UserComponent
    },
    {
      path: '**',
      component: HomeComponent
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
