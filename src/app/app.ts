import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router'
import { ButtonModule } from 'primeng/button';import { AccountService } from './services/account.service';
import { Account } from './model/account.model';
;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ButtonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'client-form';
  accountService = inject(AccountService);
  account: Account | null = null;

  ngOnInit(): void {
    this.accountService.getAccount().subscribe({
      next: (data) => {
        console.log('Account data:', data);
        this.account = data as Account;
      },
      error: (error) => {
        console.error('Error loading account:', error);
      }
    });
  }
}
