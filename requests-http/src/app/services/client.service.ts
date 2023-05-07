import { Injectable } from '@angular/core';
import { IClient } from '../interfaces/iclient';
import { HttpClient } from '@angular/common/http';
import { Page } from '../interfaces/page';
import { IQueryParameters } from '../interfaces/iquery-parameters';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private readonly API: string = `${environment.API}clients`;


  constructor(private http: HttpClient) { }

  obterUriConsulta(queryParameters:  IQueryParameters[]) {
    let uri = '';
    uri = this.API + '?';

    queryParameters.map(q => {
      if(q.value !== null)
        uri += `${q.name}=${q.value}&`
    });

    return uri.substring(0, uri.length - 1);
  }

  buscarClientesPaginados(queryParameters: IQueryParameters[]) {
    return this.http.get<Page<IClient>>( this.obterUriConsulta(queryParameters));
  }

}
