import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NguiMapModule } from '@ngui/map';

import { HttpModule} from '@angular/http';
import { UserModule } from './user/user.module';
import { CommentModule } from './comment/comment.module';
import { PostModule } from './post/post.module';
import { AppRoutingModule } from './app-routing.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    UserModule,
    CommentModule,
    HttpModule,
    PostModule,
    BsDropdownModule.forRoot(),
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDxS0WfhuJFYdqmPYgfJgt6L1PJ-ffJQ8k&libraries=places'}),
  ],
  providers: [AppService],
  bootstrap: [AppComponent]
})
export class AppModule { }
