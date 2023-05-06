import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';
import { FormValidation } from '../FormValidation';

@Component({
  selector: 'app-error-message',
  templateUrl: './error-message.component.html',
  styleUrls: ['./error-message.component.css']
})
export class ErrorMessageComponent implements OnInit {
  @Input() control!: FormControl;
  @Input() descricaoCampo!: string;

  constructor() { }

  ngOnInit(): void {
  }

  get errorMessage() {
    for(let propertyName in this.control.errors) {
      if(this.control.touched)
        return FormValidation.validatorMessage(propertyName, this.descricaoCampo, this.control.errors);
    }
    return null;
  }
}
