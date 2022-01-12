import { CBMapComponent } from './cbmap/cbmap.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StickerComponent } from './sticker/sticker.component';
import { ZoomComponent } from './zoom/zoom.component';

const routes: Routes = [
  {path:"cbmap", component: CBMapComponent},
  {path:"sticker", component: StickerComponent},
  {path:"zoom", component: ZoomComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
