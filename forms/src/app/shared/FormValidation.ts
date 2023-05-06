import {Form, FormArray, FormControl} from "@angular/forms";

export class FormValidation {
  public static requiredMinCheckBoxs(min: number = 1): any {
    return (formArray: FormArray) => {
      const totalChecked = formArray.controls
        .map(v => v.value)
        .reduce((total, currentValue) => currentValue ? total+1 : total, 0);

      return totalChecked >= min ? null : {minCheckBoxs: true}
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

  public static termoValidator(formControl: FormControl) {
    let input = formControl.value;
    return input ? null : { termoRequired: true };
  }

  public static validatorMessage(propertyName: any, campoDescricao: string, validatorValue?: any) {
    const validators: any = {
      'required': `Campo ${campoDescricao} é obrigatório!`,
      'email': `Campo ${campoDescricao} inválido!`,
      'cepInvalido': `Campo ${campoDescricao} inválido!`,
      'minlength': `Campo ${campoDescricao} deve ter o mínimo de ${validatorValue?.['minlength']?.requiredLength} caracteres!`,
      'equalTo': `Campo ${campoDescricao} e email devem ser iguais`,
      'minCheckBoxs': `Selecione pelo menos um framework!`,
      'termoRequired': 'Você deve concordar com os termos'
    }

    return validators[propertyName];
  }
}

