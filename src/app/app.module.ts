import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { IndexComponent } from './index/index.component';
import { AppModuleRouting } from './app.module.routing';
import { ImageUtilsComponent } from './image-utils/image-utils.component';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    ImageUtilsComponent
  ],
  imports: [
    BrowserModule,
    AppModuleRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
