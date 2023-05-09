import { Injectable } from '@angular/core';
import { IClient } from '../interfaces/iclient';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Page } from '../interfaces/page';
import { IQueryParameters } from '../interfaces/iquery-parameters';
import { environment } from 'src/environments/environment';
import { take, EMPTY, catchError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertModalService } from './alert-modal-service';
import { Router } from '@angular/router';
import { Alert } from '../enumerations/alert';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private readonly API: string = `${environment.API}clients`;

  constructor(
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private alertModalService: AlertModalService,
    private router: Router
  ) {}

  private obterParams(queryParameters: IQueryParameters[]) {
    let params = new HttpParams();

    queryParameters.map((q: any) => {
      if (q.value !== null) params = params.set(q.name, q.value);
    });

    return params;
  }

  buscarClientesPaginados(queryParameters: IQueryParameters[]) {
    return this.http
      .get<Page<IClient>>(this.API, {
        params: this.obterParams(queryParameters),
      })
      .pipe(
        take(1),
        catchError((e) => {
          this.spinner.hide();
          this.alertModalService.abrirModal(
            'Desculpe! Não foi possível obter os dados do servidor, tente novamente mais tarde.',
            Alert.WARNING
          );
          this.router.navigate(['home']);
          return EMPTY;
        })
      );
  }

  salvarCliente(data: any) {
    return this.http.post(this.API, data).pipe(
      take(1),
      catchError((e: HttpErrorResponse) => {
        this.spinner.hide();
        this.alertModalService.abrirModal(e.error.error, Alert.DANGER);
        return EMPTY;
      })
    );
  }
}
