import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { NguiMapModule } from '@ngui/map';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=AIzaSyDxS0WfhuJFYdqmPYgfJgt6L1PJ-ffJQ8k&libraries=places'}),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
