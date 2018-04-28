import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {AlertModule, TabsModule} from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BvSimpleOneComponent } from './bv/bv-simple-one/bv-simple-one';
import { BvPositiveNegativeZero } from './bv/bv-positive-zero/bv-positive-zero';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PrettyJsonPipe } from './common/pretty-json/prettyJson.pipe';
import { HighlightJsModule, HighlightJsService } from '../../node_modules/angular2-highlight-js';
import { BvDateComponent } from './bv/bv-date/bv-date.component';
import { BvListEmail } from './bv/bv-list-email/bv-list-email.component';
import { HelloComponent } from './minimalistic/hello/hello.component';
import { KotlinHelloComponent } from './kotlin/hello/hello.component';

import { BvRepeatableComponent } from './bv/bv-repeatable/bv-repeatable.component';
import { TechnicalInfo } from './common/technical-info/technical-info.component';
import { MaskDirective } from './common/mask/mask-directive';
import { AutoScroll } from './common/directive/AutoScroll.directive';
import { JsrStatusComponent } from './javaee/jsr-status/jsr-status.component';
import { CacheFileComponent } from './extra/cache-file/cache-file.component';
import { ChatbotComponent } from './websocket/chatbot/chatbot.component';
import { WebSocketService } from "./websocket/chatbot/websocket.service";
import { ObserverComponent } from './cdi/event/event.component';
import { ConferenceComponent } from './jpa/conference/conference.component';
import {ConferenceTableComponent} from "./jpa/conference/conference-table/conference-table.component";
import {PrettyXMLPipe} from "./common/pretty-json/prettyXML.pipe";
import {ExcelExport} from "./extra/excel/excel-export";
import {SimplePrettyXML} from "./common/pretty-json/simplePrettyXML";
import {MyDatePickerModule} from "mydatepicker";
import {QuizHelloComponent} from "./quiz/hello/quiz-hello.component";
import {DashboardComponent} from "./cases/d3/dashboard.component";
import { LoginComponent } from './security/login/login.component';
import { MarkdownModule } from 'angular2-markdown';
import {DocumentationComponent} from "./documentation/documentation.component";
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { DisqusComponent } from './common/disqus/disqus.component';
import { FooterComponent } from './common/footer/footer.component';
import {LeftMenuComponent} from "./documentation/left-menu/left-menu.component";


import {FlatmapComponent} from "./flatmap/flatmap.component";
import {RequestService} from "./common/http/request.service";
import {AuthenticationService} from "./common/http/authentication.service";
import {MatSidenavModule} from '@angular/material/sidenav';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenuHeaderComponent} from "./menus/menu-header/menu-header.component";
import {MatExpansionModule} from '@angular/material/expansion';
import { MaterialModule} from "./modules/material.module";

import { LeftMenuMatComponent} from "./menus/left-menu/left-menu.component";
import {StaticPageComponent} from "./static-page/static-page.component";
import {environment} from "../environments/environment";
import {AngularFireModule} from "angularfire2";
import {AngularFireStorageModule} from "angularfire2/storage";
import {WebsiteModule} from "./modules/website/website.module";
import { MainComponent } from './main/main.component';
import {AppRoutingModule} from "./modules/routing/app-routing.module";


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    BvSimpleOneComponent,
    PrettyJsonPipe,
    PrettyXMLPipe,
    SimplePrettyXML,
    BvDateComponent,
    BvRepeatableComponent,
    BvListEmail,
    TechnicalInfo,
    MaskDirective,
    AutoScroll,
    JsrStatusComponent,
    CacheFileComponent,
    ChatbotComponent,
    ObserverComponent,
    HelloComponent,
    ConferenceComponent,
    ConferenceTableComponent,
    ExcelExport,
    QuizHelloComponent,
    DashboardComponent,
    KotlinHelloComponent,
    LoginComponent,
    DocumentationComponent,
    BvPositiveNegativeZero,
    DisqusComponent,
    FooterComponent,
    LeftMenuComponent,
    FlatmapComponent,
    MenuHeaderComponent,
    LeftMenuMatComponent,
    StaticPageComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    AngularFireModule.initializeApp(environment.firebase),
    FormsModule,
    MaterialModule,
    HighlightJsModule,
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    HttpModule,
    MyDatePickerModule,
    MarkdownModule.forRoot(),
    AccordionModule.forRoot(),
    CollapseModule.forRoot(),
    MatSidenavModule,
    BrowserAnimationsModule,
    MatExpansionModule,
    AngularFireStorageModule,
    WebsiteModule
   ],
  providers: [HighlightJsService, WebSocketService, RequestService, AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
