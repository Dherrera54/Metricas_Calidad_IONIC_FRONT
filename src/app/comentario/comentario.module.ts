import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AppHeaderModule } from '../app-header/app-header.module';
import { AppFooterModule } from '../app-footer/app-footer.module';
import { ComentarioCancionListComponent } from './comentario-cancion-list/comentario-cancion-list.component';
import { ComentarioCancionCreateComponent } from './comentario-cancion-create/comentario-cancion-create.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppHeaderModule,
    AppFooterModule
  ],
  declarations: [
    ComentarioCancionListComponent,
    ComentarioCancionCreateComponent
  ],
  exports: [
    ComentarioCancionListComponent,
    ComentarioCancionCreateComponent
  ]
})
export class ComentarioModule { }
