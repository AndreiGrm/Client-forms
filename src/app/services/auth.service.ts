import { computed, Injectable, signal } from '@angular/core';
import { User } from '../model/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUser = signal<User | null>(null);

  readonly user       = this.currentUser.asReadonly();
  readonly isLoggedIn = computed(() => !!this.currentUser());
  readonly ownerEmail = computed(() => this.currentUser()?.email ?? '');
  readonly accountId  = computed(() => this.currentUser()?.account_id ?? null);

  setUser(user: User): void { this.currentUser.set(user); }
  logout(): void            { this.currentUser.set(null); }
}
