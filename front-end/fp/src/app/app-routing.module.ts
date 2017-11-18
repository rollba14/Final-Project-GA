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
    // 'events' or 'map' might be more specific / intuitive for what this component is showing
    {
        path: 'post',
        component: PostComponent
    },
    // Currently no link to access the AboutComponent
    {
        path: 'about',
        component: AboutComponent
    },
    {
      path: 'user',
      component: UserComponent
    }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}
