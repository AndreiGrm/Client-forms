import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailService } from './email.service';

@Injectable({
  providedIn: 'root'
})
export class InvitationService {
  private emailService = inject(EmailService);

  sendInvitation(email: string): Observable<unknown> {
    return this.emailService.sendInvitation(email);
  }

  decodeToken(token: string): { email: string } | null {
    return this.emailService.decodeToken(token);
  }
}
