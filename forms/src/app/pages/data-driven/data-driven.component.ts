import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { IEndereco } from "../../interfaces/IEndereco";
import { DropdownService } from "../../services/dropdown.service";
import { IEstadoBrasileiro } from "../../interfaces/IEstadoBrasileiro";
import { Observable } from "rxjs";
import { ConsultaCepService } from "../../services/consulta-cep.service";
import { IFramework } from "../../interfaces/IFramework";
import { FormValidation } from "../../shared/FormValidation";
import { CustomValidators } from 'ng2-validation';
import { Router } from '@angular/router';

@Component({
  selector: 'app-data-driven',
  templateUrl: './data-driven.component.html',
  styleUrls: ['./data-driven.component.css']
})
export class DataDrivenComponent implements OnInit {

  form!: FormGroup;
  estadosBrasileiros$!: Observable<IEstadoBrasileiro[]>;
  pontosTuristicos!: any[];
  tipoEnderecos!: any[];
  frameworks: IFramework[] = [];
  frameworksCliente: IFramework[] = [];
  editar: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private consultaCepService: ConsultaCepService,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    let email = new FormControl('', [Validators.required, Validators.email]);
    if (this.editar)
      this.carregarCheboxs();

    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      sobrenome: [null, [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      email: email,
      confirmarEmail: [null, [CustomValidators.equalTo(email)]],
      tipoEndereco: ['c', [Validators.required]],
      termo: [false, FormValidation.termoValidator],
      frameworks: this.buildFrameworks(),
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, FormValidation.cepValidator]],
        rua: [null, [Validators.required]],
        complemento: [null],
        numero: [null],
        bairro: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
        estado: [null, [Validators.required]],
        pontosTuristicos: [null],
      })
    });

    this.obterEstadosBrasileiros();
    this.obterPontosTuristicos();
    this.obterTipoEnderecos();
  }

  onSubmit(): void {
    let valueSubmit = Object.assign({}, this.form.value);
    valueSubmit = Object.assign(valueSubmit, {
      frameworks: valueSubmit.frameworks
        .map((v: boolean, i: number) => v ? this.frameworks[i].id : null)
        .filter((v: any) => v !== null)
    });

    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit)).subscribe(dados => {
      console.log(valueSubmit);
      this.resetarForm();
      console.log('PASSOU AQUI!')

    },
      (error: any) => alert('Houve ao salvar os dados, tente novamente!')
    );
  }

  resetarForm() {
    this.form.reset();
    this.form.get('tipoEndereco')?.setValue('c');
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
    let cep = this.form.get('endereco.cep')?.value;
    cep = cep.replace(/\D/g, '');
    const regex = /^[0-9]{8}$/;

    if (regex.test(cep))
      this.consultaCepService.consultaCep(cep).subscribe(
        (data: any) => {
          if (data.erro)
            alert('Cep inválido ou não encontrado: Verifique os dados e tente novamente');
          else 
            this.popularFormCamposEndereco(data);
        }
      );
  }

  private popularFormCamposEndereco(data: IEndereco) {
    this.form.patchValue({
      endereco: {
        cep: data.cep,
        rua: data.logradouro,
        bairro: data.bairro,
        cidade: data.localidade,
        estado: data.uf,
        complemento: data.complemento
      }
    });
  }

  getControl(controlName: string): FormControl {
    return this.form.get(controlName) as FormControl;
  }

  private obterEstadosBrasileiros() {
    this.estadosBrasileiros$ = this.dropDownService.obterEstadosBrasileiros();
  }

  private obterPontosTuristicos() {
    this.pontosTuristicos = this.dropDownService.obterPontosTuristicos();
  }

  private obterTipoEnderecos() {
    this.tipoEnderecos = this.dropDownService.obterOptionsEndereco();
  }

  private obterFrameworks() {
    this.frameworks = this.dropDownService.obterFrameworks();
  }

  buildFrameworks() {
    this.obterFrameworks();
    const values = this.frameworks.map(f => new FormControl(this.editar ? this.preencherCheckBox(f) : false));
    return this.formBuilder.array(values, FormValidation.requiredMinCheckBoxs(1));
  }

  obterFormArrayControls() {
    return (this.form.get('frameworks') as FormArray).controls;
  }

  carregarCheboxs() {
    this.frameworksCliente = this.dropDownService.obterFrameworksCliente();
  }

  private preencherCheckBox(framework: IFramework): boolean {
    for (let f of this.frameworksCliente) {
      if (f.id == framework.id)
        return true;
    }
    return false;
  }

  validarNomeInformado() {
    const campoNome = this.form.get('nome');
    if(campoNome?.valid)
      this.dropDownService.validarNomeInformado(campoNome.value).subscribe(response => {
        if(response) {
          alert(`O nome ${campoNome.value} não está disponível`)
          campoNome.setValue(null);
        }
      });
  }
}

