import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AlertModule, TabsModule } from 'ngx-bootstrap';
import { CollapseModule } from 'ngx-bootstrap/collapse';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BvSimpleOneComponent } from './jee/bv/bv-simple-one/bv-simple-one';
import { BvPositiveNegativeZero } from './jee/bv/bv-positive-zero/bv-positive-zero';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PrettyJsonPipe } from './common/pretty-json/prettyJson.pipe';
import { HighlightJsModule, HighlightJsService } from '../../node_modules/angular2-highlight-js';
import { BvDateComponent } from './jee/bv/bv-date/bv-date.component';
import { BvListEmail } from './jee/bv/bv-list-email/bv-list-email.component';
import { HelloComponent } from './minimalistic/hello/hello.component';
import { KotlinHelloComponent } from './jee/kotlin/hello/hello.component';

import { BvRepeatableComponent } from './jee/bv/bv-repeatable/bv-repeatable.component';
import { TechnicalInfo } from './common/technical-info/technical-info.component';
import { MaskDirective } from './common/mask/mask-directive';
import { AutoScroll } from './common/directive/AutoScroll.directive';
import { JsrStatusComponent } from './jee/jsr-status/jsr-status.component';
import { CacheFileComponent } from './extra/cache-file/cache-file.component';
import { ChatbotComponent } from './jee/websocket/chatbot/chatbot.component';
import { WebSocketService } from "./jee/websocket/chatbot/websocket.service";
import { ObserverComponent } from './jee/cdi/event/event.component';
import { ConferenceComponent } from './jee/jpa/conference/conference.component';
import { ConferenceTableComponent } from "./jee/jpa/conference/conference-table/conference-table.component";
import { PrettyXMLPipe } from "./common/pretty-json/prettyXML.pipe";
import { ExcelExport } from "./extra/excel/excel-export";
import { SimplePrettyXML } from "./common/pretty-json/simplePrettyXML";
import { MyDatePickerModule } from "mydatepicker";
import { QuizHelloComponent } from "./jee/quiz/hello/quiz-hello.component";
import { DashboardComponent } from "./cases/d3/dashboard.component";
import { LoginComponent } from './jee/security/login/login.component';
import { MarkdownModule } from 'angular2-markdown';
import { DocumentationComponent } from "./documentation/documentation.component";
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { FooterComponent } from './common/footer/footer.component';
import { LeftMenuComponent } from "./documentation/left-menu/left-menu.component";

import { FlatmapComponent } from "./flatmap/flatmap.component";
import { RequestService } from "./common/http/request.service";
import { AuthenticationService } from "./common/http/authentication.service";
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuHeaderComponent } from "./menus/menu-header/menu-header.component";
import { MatExpansionModule } from '@angular/material/expansion';
import { MaterialModule } from "./modules/material.module";

import { LeftMenuMatComponent } from "./menus/left-menu/left-menu.component";
import { StaticPageComponent } from "./static-page/static-page.component";
import { WebsiteModule } from "./modules/website/website.module";
import { MainComponent } from './main/main.component';
import { AppRoutingModule } from "./modules/routing/app-routing.module";
import { LastArticlesComponent } from './last-articles/last-articles/last-articles.component';
import { MaterialDatatableComponent } from './angular/material-datatable/material-datatable.component';
import { AngularModule } from "./modules/angular/angular.module";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { AvEditorComponent } from './av-components/AvTable/av-editor/av-editor.component';
import { AvFormElement } from "./av-components/AvTable/av-form-element/AvFormElement";
import { AvFormElementComponent } from "./av-components/AvTable/av-form-element/av-form-element.component";
import { AvColumnPropertiesComponent } from "./av-components/AvTable/av-column-properties/av-column-properties.component";

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
    FooterComponent,
    LeftMenuComponent,
    FlatmapComponent,
    MenuHeaderComponent,
    LeftMenuMatComponent,
    StaticPageComponent,
    MainComponent,
    LastArticlesComponent,
    MaterialDatatableComponent,
    AvEditorComponent,
    AvFormElementComponent,
    AvColumnPropertiesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AngularModule,
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
    WebsiteModule,
    HttpClientModule,
  ],
  providers: [HighlightJsService, WebSocketService, RequestService,
    AuthenticationService],
  entryComponents: [AvEditorComponent, AvColumnPropertiesComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
