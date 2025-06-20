import { Component, inject, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { Client } from '../../model/client.model';
import { TableModule } from 'primeng/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  imports: [TableModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export default class ClientsComponent implements OnInit {
  clients: Client[] = [];
  router = inject(Router)
  clientService = inject(ClientService);

  ngOnInit () {
    console.log(this)
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
    console.log('delete client', client);
    this.clientService.delete(client.id).subscribe({
      next: () => {
        this.clients = this.clients.filter(c => c.id !== client.id);
        console.log('Client deleted successfully');
      },
      error: (error) => {
        console.error('Error deleting client:', error);
      }
    });
  }

  addClient (): void {
    console.log('add client');
  }

  inviteClient () {
    console.log('invite client');
  }

  goHome (): void {
    this.router.navigate(['homepage/client-form']);
  }
}
