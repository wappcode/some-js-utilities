import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { RouterModule } from '@angular/router';
import { ImageUtilsComponent } from './image-utils/image-utils.component';
import { ColorUtilitiesComponent } from './color-utilities/color-utilities.component';
import { CanvasUtilitiesComponent } from './canvas-utilities/canvas-utilities.component';

const routes = [
  {
    path: 'index',
    component: IndexComponent,
  },
  {
    path: 'image-utils',
    component: ImageUtilsComponent,
  },
  {
    path: 'color-utilities',
    component: ColorUtilitiesComponent,
  },
  {
    path: 'canvas-utilities',
    component: CanvasUtilitiesComponent,
  },
  {
    path: '',
    redirectTo: '/index',
    pathMatch: 'full',
  },

  { path: '**', component: IndexComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppModuleRouting {}
