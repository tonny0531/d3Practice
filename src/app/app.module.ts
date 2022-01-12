import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CBMapComponent } from './cbmap/cbmap.component';
import { StickerComponent } from './sticker/sticker.component';
import { ZoomComponent } from './zoom/zoom.component';

@NgModule({
  declarations: [
    AppComponent,
    CBMapComponent,
    StickerComponent,
    ZoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
