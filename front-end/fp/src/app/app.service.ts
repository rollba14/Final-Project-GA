import { Injectable } from '@angular/core';

@Injectable()
export class AppService {
  private baseUrl = "https://glacial-chamber-79751.herokuapp.com";
  // private baseUrl = "http://localhost:3000";

  // This is a basic service for configuring all
  // global constant that change baseUrl depending on
  // production or deployment. This should be done
  // via automatic setup with angular webpack.definePlugin
  // but I'm not sure how to do that yet.
  constructor() {}
    getBaseUrl(){
      return this.baseUrl;
  }
}
