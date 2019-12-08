import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';

import { LocalidadRoutingModule } from './localidad-routing.module';
import { LocalidadComponent } from './localidad/localidad.component';


@NgModule({
  declarations: [LocalidadComponent],
  imports: [
    CommonModule,
    LocalidadRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forRoot(),
    FormlyBootstrapModule
  ]
})
export class LocalidadModule { }
