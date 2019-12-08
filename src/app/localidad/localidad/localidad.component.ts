import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FormlyFieldConfig} from '@ngx-formly/core';

@Component({
  selector: 'app-localidad',
  templateUrl: './localidad.component.html',
  styles: []
})
export class LocalidadComponent implements OnInit {
  form = new FormGroup({});
  model = { nombre: '', cod_postal : 0 };
  fields: FormlyFieldConfig[] = [
      {
        key: 'nombre',
        type: 'input',
        templateOptions: {
          label: 'Nombre',
          placeholder: 'Ingrese el nombre',
          required: true,
        }
      },
      {
        key: 'cod_postal',
        type: 'input',
        templateOptions: {
          label: 'Código Postal',
          placeholder: 'Cod. Postal',
          type: 'number'
        }
      }
  ];

  constructor() { }

  ngOnInit() {
  }

  submit(model: any) {
    console.log(model);
  }

}
