import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from '../../model/client.model';
import { ClientService } from '../../services/client.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  imports: []
})
export default class DashboardComponent implements OnInit {
  private clientService = inject(ClientService);
  router = inject(Router);

  clients = signal<Client[]>([]);
  loading = signal(true);

  totalClients  = computed(() => this.clients().length);
  recentClients = computed(() => [...this.clients()].reverse().slice(0, 5));

  ngOnInit(): void {
    this.clientService.load().subscribe({
      next: (data) => {
        this.clients.set(data as Client[]);
        this.loading.set(false);
      },
      error: () => this.loading.set(false)
    });
  }

  goToClients(): void {
    this.router.navigate(['homepage/clients']);
  }

  goToForm(): void {
    this.router.navigate(['homepage/client-form']);
  }
}
