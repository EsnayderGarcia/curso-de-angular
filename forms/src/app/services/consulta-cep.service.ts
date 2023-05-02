import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IEndereco} from "../interfaces/IEndereco";

@Injectable({
  providedIn: 'root'
})
export class ConsultaCepService {

  constructor(private http: HttpClient) {}

  consultaCep(cep: string) {
    const url = `https://viacep.com.br/ws/${cep}/json/`;
    cep = cep.replace(/\D/g, '');
    const regex = /^[0-9]{8}$/;

    if(regex.test(cep))
      return this.http.get<IEndereco>(url);
    return null;
  }
}
