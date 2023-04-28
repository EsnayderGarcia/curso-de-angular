import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-data-driven',
  templateUrl: './data-driven.component.html',
  styleUrls: ['./data-driven.component.css']
})
export class DataDrivenComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) {}


  ngOnInit(): void {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      sobrenome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.email]],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required]],
        rua:[null, [Validators.required]],
        complemento: [null],
        numero: [null],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]],
      })
    });
  }

  onSubmit(): void {
    this.http.post('https://httpbin.org/post', JSON.stringify(this.form.value))
      .subscribe(dados => {
        console.log(dados);
        this.resetarForm();
      }, (error: any) => alert('Deu Ruim, meu amigo!'));
  }

  resetarForm() {
    this.form.reset();
  }

  verificaValidTouched(campo: string) {
    return !this.form.get(campo)?.valid && this.form.get(campo)?.touched
  }

  aplicaCssErro(campo: string) {
    return {
      'is-invalid': this.verificaValidTouched(campo)
    }
  }
  consultaCep() {
    let cep = this.form.get('endereco.cep');
    let cepConsulta = cep?.value?.replace(/\D/g, '');

    if (cepConsulta.trim() !== '') {
      let regexCep = /^[0-9]{8}$/;

      if (regexCep.test(cepConsulta)) {
        this.http.get<any>(`https://viacep.com.br/ws/${cepConsulta}/json/`)
          .subscribe((data: any) => console.log(data.logradouro));
      }
      else {
        alert('Informe um cep válido!');
        this.form.get('endereco')?.reset();
      }
    }
    else {
      alert('Informe um cep válido!');
      this.form.get('endereco')?.reset();
    }
  }
}
