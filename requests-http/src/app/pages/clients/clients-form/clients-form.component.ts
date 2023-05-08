import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss']
})
export class ClientsFormComponent {
  form!: FormGroup;
  private submmited = false;

  constructor(private formBuilder: FormBuilder){
  }

  ngOnInit() {
    this.construirFormGroup();
  }

  construirFormGroup() {
    this.form =  this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength]],
      cpf: [null, [Validators.required]],
      income: [null, [Validators.required, Validators.min(100)]],
      birthDate: [null, [Validators.required]],
      children: [null]
    });
  }
  
  aplicaCssErro(campo: string) {
    const field = this.form.get(campo);
    return {
      'is-invalid': this.submmited && field?.invalid
    }
  }

  onSubmit() {
    this.submmited = true;
    if(!this.form.invalid) {
      console.log("FORM:", this.form);
      console.log("FORM VALUE:", this.form.value);
    }
  }


}