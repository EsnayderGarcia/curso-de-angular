import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {IEndereco} from "../../interfaces/IEndereco";
import {DropdownService} from "../../services/dropdown.service";
import {IEstadoBrasileiro} from "../../interfaces/IEstadoBrasileiro";
import {Observable} from "rxjs";
import {ConsultaCepService} from "../../services/consulta-cep.service";
import {IFramework} from "../../interfaces/IFramework";

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
  editar: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private dropDownService: DropdownService,
    private consultaCepService: ConsultaCepService
  ) {
  }

  ngOnInit(): void {
    if (this.editar)
      this.carregarCheboxs();

    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      sobrenome: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      email: [null, [Validators.required, Validators.email]],
      tipoEndereco: ['c', [Validators.required]],
      termo: [null, [Validators.required]],
      frameworks: this.buildFrameworks(),
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required]],
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

    this.http.post('https://httpbin.org/post', JSON.stringify(valueSubmit)).subscribe(dados =>
      {
        console.log(dados)
        this.resetarForm();
      },
      (error: any) => alert('Deu Ruim, meu amigo!')
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

    if (cep != null && cep !== '') {
      const respostaConsultaCep = this.consultaCepService.consultaCep(cep);
      if (respostaConsultaCep == null) {
        alert('Informe um cep válido!');
        this.limparCamposObrigatoriosEndereco()
      } else
        this.consultaCepService.consultaCep(cep)?.subscribe(data => this.popularFormCamposEndereco(data));
    } else {
      alert('Informe um cep válido!');
      this.limparCamposObrigatoriosEndereco()
    }
  }

  limparCamposObrigatoriosEndereco() {
    this.form.patchValue({
      endereco: {
        cep: null,
        rua: null,
        bairro: null,
        cidade: null,
        estado: null
      }
    });
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
    return this.formBuilder.array(values);
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
}

