import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-control-error',
  templateUrl: './control-error.component.html',
  styleUrls: ['./control-error.component.css']
})
export class ControlErrorComponent implements OnInit {
  @Input() formGroup!: FormGroup;
  @Input() nomeCampo!: string;

  constructor() { }

  ngOnInit(): void {
  }

  verificaValidTouched() {
    return !this.formGroup.get(this.nomeCampo)?.valid && this.formGroup.get(this.nomeCampo)?.touched
  }

  hasMinLengthOrMaxLength() {
    let input = this.formGroup.get(this.nomeCampo)
    return input?.hasError('minlength') || input?.hasError('maxlength');
  }

  isRequired() {
    let input = this.formGroup.get(this.nomeCampo)
    return input?.hasError('required');
  }

  hasEmailValidation() {
    let input = this.formGroup.get(this.nomeCampo)
    return input?.hasError('email');
  }
}
