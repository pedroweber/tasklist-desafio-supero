import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CreateTaskComponent } from './pages/modal/create-task/create-task.component';
import { InfoTaskComponent } from './pages/modal/info-task/info-task.component';
import { NgbModule, NgbActiveModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import {TasklistServiceService} from './api/tasklist-service.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    CreateTaskComponent,
    InfoTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    FormsModule,
    NgbModalModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [NgbActiveModal, TasklistServiceService],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateTaskComponent,
    InfoTaskComponent
  ]
})
export class AppModule { }
