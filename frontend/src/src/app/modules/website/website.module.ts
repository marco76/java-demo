import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TwitterNewsComponent } from "../../website/twitter-news/twitter-news.component";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    TwitterNewsComponent
  ],
  exports: [
    TwitterNewsComponent
  ]
})
export class WebsiteModule {
}
