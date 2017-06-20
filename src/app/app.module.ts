import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ContatoComponent } from './contato/contato.component';
import { ReactiveFormsModule } from '@angular/forms'
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';
import { NgZone } from '@angular/core';

@NgModule({
  declarations: [ AppComponent,  ContatoComponent ],
  imports: [ BrowserModule, ReactiveFormsModule, HttpModule ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
