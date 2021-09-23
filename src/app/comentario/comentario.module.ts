import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ComentarioCancionListComponent } from './comentario-cancion-list/comentario-cancion-list.component';
import { ComentarioCancionCreateComponent } from './comentario-cancion-create/comentario-cancion-create.component';


@NgModule({
  declarations: [
    ComentarioCancionListComponent,
    ComentarioCancionCreateComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    ComentarioCancionListComponent,
    ComentarioCancionCreateComponent
  ]
})
export class ComentarioModule { }
