import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes}   from '@angular/router';
import { AlertModule } from 'ng2-bootstrap';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BvSimpleOneComponent } from './bv/bv-simple-one/bv-simple-one';
import { DropdownModule } from 'ng2-bootstrap/dropdown';
import { PrettyJsonPipe } from './common/pretty-json/prettyJson.pipe';
import { HighlightJsModule, HighlightJsService } from '../../node_modules/angular2-highlight-js';
import { BvDateComponent } from './bv/bv-date/bv-date.component';
import { BvListEmail } from './bv/bv-list-email/bv-list-email.component';
import { HelloComponent } from './minimalistic/hello/hello.component';

import { BvRepeatableComponent } from './bv/bv-repeatable/bv-repeatable.component';
import { TechnicalInfo } from './common/technical-info/technical-info.component';
import { MaskDirective } from './common/mask/mask-directive';
import { JsrStatusComponent } from './jsr-status/jsr-status.component';
import { HttpClient } from "./common/http/HttpClient";
import { CacheFileComponent } from './extra/cache-file/cache-file.component';
import { ChatbotComponent } from './websocket/chatbot/chatbot.component';
import { WebSocketService } from "./websocket/chatbot/websocket.service";
import { ObserverComponent } from './cdi/event/event.component';
import { ConferenceComponent } from './jpa/conference/conference.component';
import {ConferenceTableComponent} from "./jpa/conference/conference-table/conference-table.component";
import {PrettyXMLPipe} from "./common/pretty-json/prettyXML.pipe";

const routes : Routes = [
  { path: '', redirectTo: 'home', pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  { path: 'bv', component: BvSimpleOneComponent },
  { path: 'bv-date', component: BvDateComponent },
  { path: 'bv-repeatable', component: BvRepeatableComponent },
  { path: 'bv-list-email', component: BvListEmail },
  { path: 'extra-cache', component: CacheFileComponent},
  { path: 'chatbot', component: ChatbotComponent},
  { path: 'cdi-weather', component: ObserverComponent},
  { path: 'hello', component: HelloComponent},
  { path: 'conferences', component:ConferenceTableComponent},
  { path: 'jpa-conferences', component : ConferenceComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BvSimpleOneComponent,
    PrettyJsonPipe,
    PrettyXMLPipe,
    BvDateComponent,
    BvRepeatableComponent,
    BvListEmail,
    TechnicalInfo,
    MaskDirective,
    JsrStatusComponent,
    CacheFileComponent,
    ChatbotComponent,
    ObserverComponent,
    HelloComponent,
    ConferenceComponent,
    ConferenceTableComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HighlightJsModule,
    DropdownModule.forRoot(),
    AlertModule.forRoot(),
    RouterModule.forRoot(routes),
    HttpModule
  ],
  providers: [HighlightJsService, HttpClient, WebSocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
