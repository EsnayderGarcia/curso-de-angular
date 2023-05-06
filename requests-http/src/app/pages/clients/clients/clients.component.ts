import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  teste: string = '';
  max = 5
  constructor(private clientService: ClientService) {
  }

  ngOnInit(): void {
    this.teste = this.clientService.teste();
  }

}
