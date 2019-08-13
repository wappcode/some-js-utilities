import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { AppModuleRouting } from './app.module.routing';
import { ImageUtilsComponent } from './image-utils/image-utils.component';
import { ColorUtilitiesComponent } from './color-utilities/color-utilities.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ImageUtilsComponent,
    ColorUtilitiesComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppModuleRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
