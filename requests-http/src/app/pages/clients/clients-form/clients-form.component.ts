import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Alert } from 'src/app/enumerations/alert';
import { AlertModalService } from 'src/app/services/alert-modal-service';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients-form',
  templateUrl: './clients-form.component.html',
  styleUrls: ['./clients-form.component.scss'],
})
export class ClientsFormComponent {
  form!: FormGroup;
  private submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private ngxService: NgxSpinnerService,
    private alertModalService: AlertModalService,
    private router: Router
  ) {}

  ngOnInit() {
    this.construirFormGroup();
  }

  construirFormGroup() {
    this.form = this.formBuilder.group({
      name: [
        null,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(100),
        ],
      ],
      cpf: [null, [Validators.required]],
      income: [null, [Validators.required]],
      birthDate: [null, [Validators.required]],
      children: [null],
    });
  }

  aplicaCssErro(campo: string) {
    const field = this.form.get(campo);
    return {
      'is-invalid': this.submitted && field?.invalid,
    };
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {
      this.ngxService.show()
      this.clientService.salvarCliente(this.form.value)
      .subscribe(response => {
        this.ngxService.hide();
        this.alertModalService.abrirModal('Cliente cadastro com succeso', Alert.SUCCESS);
        this.router.navigate(['clients']);
      });
    }
  }
}
