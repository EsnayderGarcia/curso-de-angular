import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { IClient } from 'src/app/interfaces/iclient';
import { IQueryParameters } from 'src/app/interfaces/iquery-parameters';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent implements OnInit {
  clients!: IClient[];
  errorServerMessage: string = '';

  currentPage: number = 1;
  itemsPerPage!: number;
  totalItems!: number;

  size: IQueryParameters = { name: 'size', value: null };
  page: IQueryParameters = { name: 'page', value: null  };
  queryParameters: IQueryParameters[] = [this.size, this.page];

  constructor(
    private clientService: ClientService,
    private spinner: NgxSpinnerService,
  ) {}

  ngOnInit(): void {
    this.popularListaClients();
  }

  popularListaClients() {
    this.clients = [];
    this.spinner.show();

    this.clientService
      .buscarClientesPaginados(this.queryParameters)
      .subscribe((response) => {
        this.totalItems = response.totalElements;
        this.itemsPerPage = response.size;
        this.clients = response.content;
        this.spinner.hide();
      });
  }

  atualizarPagina(numberPage?: number) {
    this.page['value'] = 0;
    this.currentPage = numberPage ? numberPage : 0;

    if(numberPage) this.page['value'] = numberPage - 1;
    this.popularListaClients();
  }
}
