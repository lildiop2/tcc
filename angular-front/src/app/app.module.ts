import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProdutoComponent } from './produto/produto.component';

@NgModule({
  declarations: [
    AppComponent,
    ProdutoComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    { provide: Window, useValue: window }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
