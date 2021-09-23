import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {PopFormNotificationComponent} from "./pop-form-notification/pop-form-notification.component";


@NgModule({
  declarations: [ HeaderComponent,PopFormNotificationComponent],
  imports:[CommonModule],
  exports: [HeaderComponent]
})
export class AppHeaderModule { }
