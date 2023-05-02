import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IEstadoBrasileiro} from "../interfaces/IEstadoBrasileiro";
import {IFramework} from "../interfaces/IFramework";

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: HttpClient) {
  }

  obterEstadosBrasileiros() {
    return this.http.get<IEstadoBrasileiro[]>('assets/estados.json');
  }

  obterPontosTuristicos() {
    return [
      {nome: 'veropeso', desc: 'Ver-O-Peso'},
      {nome: 'estacao-das-docas', desc: 'Estação das Docas'},
      {nome: 'mangal', desc: 'Mangal das Garças'},
      {nome: 'forte-do-castelo', desc: 'Forte do Castelo'},
      {nome: 'cotijuba', desc: 'Ilha Encantada de Cotijuba'}
    ];
  }

  obterOptionsEndereco() {
    return [
      {valor: 'c', desc: 'Comercial'},
      {valor: 'r', desc: 'Residencial'},
      {valor: 'h', desc: 'Hospitalar'}
    ];
  }

  obterFrameworks(): IFramework[] {
    return [
      {
        id: 1,
        desc: 'Angular'
      },
      {
        id: 2,
        desc: 'React JS'
      },
      {
        id: 3,
        desc: 'Vue JS'
      },
      {
        id: 4,
        desc: 'Django'
      }
    ];
  }

  obterFrameworksCliente(): IFramework[] {
    return [
      {
        id: 1,
        desc: 'Angular'
      },
      {
        id: 2,
        desc: 'React JS'
      },
      {
        id: 4,
        desc: 'Django'
      }
    ];
  }
}
