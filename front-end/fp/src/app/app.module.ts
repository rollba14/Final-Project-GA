import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NguiMapModule } from '@ngui/map';
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

import { UserModule } from './user/user.module';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    UserModule,
    HttpModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDxS0WfhuJFYdqmPYgfJgt6L1PJ-ffJQ8k&libraries=places'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
