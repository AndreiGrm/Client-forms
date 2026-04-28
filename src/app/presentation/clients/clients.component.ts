import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { InvitationService } from '../../services/invitation.service';
import { Client } from '../../model/client.model';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clients',
  imports: [TableModule, DialogModule, InputTextModule, ButtonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export default class ClientsComponent implements OnInit {
  private clientService     = inject(ClientService);
  private invitationService = inject(InvitationService);
  router = inject(Router);

  clients = signal<Client[]>([]);

  // Invite dialog state
  inviteVisible      = signal(false);
  inviteEmail        = signal('');
  inviteEmailTouched = signal(false);
  inviteSending      = signal(false);
  inviteSuccess      = signal(false);
  inviteError        = signal('');

  inviteEmailError = computed(() => {
    const e = this.inviteEmail();
    if (!e) return 'Campo obbligatorio.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return 'Email non valida.';
    return '';
  });

  inviteFormValid = computed(() => !this.inviteEmailError());

  ngOnInit(): void {
    this.loadClients();
  }

  private loadClients(): void {
    this.clientService.load().subscribe({
      next: (data) => this.clients.set(data as Client[]),
      error: (error) => console.error('Error loading clients:', error)
    });
  }

  deleteClient(client: Client): void {
    this.clientService.delete(client.id).subscribe({
      next: () => this.clients.update(list => list.filter(c => c.id !== client.id)),
      error: (error) => console.error('Error deleting client:', error)
    });
  }

  openInviteDialog(): void {
    this.inviteEmail.set('');
    this.inviteEmailTouched.set(false);
    this.inviteSuccess.set(false);
    this.inviteError.set('');
    this.inviteSending.set(false);
    this.inviteVisible.set(true);
  }

  sendInvite(): void {
    this.inviteEmailTouched.set(true);
    if (!this.inviteFormValid()) return;

    this.inviteSending.set(true);
    this.invitationService.sendInvitation(this.inviteEmail()).subscribe({
      next: () => {
        this.inviteSending.set(false);
        this.inviteSuccess.set(true);
      },
      error: () => {
        this.inviteSending.set(false);
        this.inviteError.set('Eroare la trimiterea invitației. Verificați configurația EmailJS în environment.ts.');
      }
    });
  }

  addClient(): void {
    this.router.navigate(['homepage/client-form']);
  }

  inviteClient(): void {
    this.openInviteDialog();
  }

  goHome(): void {
    this.router.navigate(['homepage/client-form']);
  }
}
