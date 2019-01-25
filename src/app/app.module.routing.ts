import { NgModule } from '@angular/core';
import { IndexComponent } from './index/index.component';
import { RouterModule } from '@angular/router';
import { ImageUtilsComponent } from './image-utils/image-utils.component';

const routes = [
    {
        path: 'index',
        component: IndexComponent
    },
    {
        path: 'image-utils',
        component: ImageUtilsComponent
    },
    {
        path: '',
        redirectTo: '/index',
        pathMatch: 'full'
    },
    
    { path: '**', component: IndexComponent }

]


@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
      ]
})
export class AppModuleRouting {

}