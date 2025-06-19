import { Component, inject, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../model/client.model';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-clients',
  imports: [TableModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export default class ClientsComponent implements OnInit {
  clients: Client[] = [];
  clientService = inject(ClientService);

  ngOnInit () {
    this.clientService.load().subscribe({
       next: (data) => {
          this.clients = data as Client[];
        },
        error: (error) => {
          console.error('Error loading clients:', error);
        }
    });
  }

  deleteClient (client: Client):void {
    console.log('delete client');
  }

  addClient (): void {
    console.log('add client');
  }

  inviteClient () {
    console.log('invite client');
  }
}
