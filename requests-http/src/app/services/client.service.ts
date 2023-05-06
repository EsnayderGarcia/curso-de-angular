import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor() { }

  teste() {
    return 'Olá, esse é o service de clientes';
  }
}
