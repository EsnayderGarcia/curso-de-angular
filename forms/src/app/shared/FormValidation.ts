import {Form, FormArray, FormControl} from "@angular/forms";

export class FormValidation {
  public static requiredMinCheckBoxs(min: number = 1): any {
    return (formArray: FormArray) => {
      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, currentValue) => currentValue ? total+1 : total, 0);

      return totalChecked >= min ? null : {required: true}
    };
  }

  public static cepValidator(formControl: FormControl) {
      let cep = formControl.value;
      if(cep && cep !== '') {
        cep = cep.replace(/\D/g, '');
        const regex = /^[0-9]{8}$/;
        return regex.test(cep) ? null : {cepInvalido: true}
      }

      return null;
  }

  public static checkboxValidator(formControl: FormControl) {
    let input = formControl.value;
    return input ? null : { checkboxInvalido: true };
  }
}
