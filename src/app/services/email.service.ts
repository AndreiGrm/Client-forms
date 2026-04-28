import { inject, Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';
import { from, Observable } from 'rxjs';
import { AuthService } from './auth.service';

const { publicKey, serviceId, inviteTemplateId, confirmationTemplateId } = environment.emailjs;

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private authService = inject(AuthService);

  constructor() {
    emailjs.init({ publicKey });
  }

  // Token: base64(JSON({ e: recipientEmail, a: accountId, o: ownerEmail, t: timestamp }))
  generateToken(email: string, accountId: number): string {
    const ownerEmail = this.authService.ownerEmail();
    const payload = JSON.stringify({ e: email, a: accountId, o: ownerEmail, t: Date.now() });
    return btoa(payload);
  }

  decodeToken(token: string): { email: string; accountId: number; ownerEmail: string } | null {
    try {
      const payload = JSON.parse(atob(token));
      const { e: email, a: accountId, o: ownerEmail, t: timestamp } = payload;
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
      if (!email || !accountId || isNaN(timestamp) || Date.now() - timestamp > sevenDaysMs) return null;
      return { email, accountId, ownerEmail: ownerEmail ?? '' };
    } catch {
      return null;
    }
  }

  sendInvitation(recipientEmail: string): Observable<unknown> {
    const accountId = this.authService.accountId() ?? 1;
    const token = this.generateToken(recipientEmail, accountId);
    const registerLink = `${environment.appUrl}/register?token=${token}`;

    return from(
      emailjs.send(serviceId, inviteTemplateId, {
        to_email:      recipientEmail,
        register_link: registerLink
      })
    );
  }

  sendRegistrationConfirmation(clientData: Record<string, unknown>, ownerEmail: string): Observable<unknown> {
    return from(
      emailjs.send(serviceId, confirmationTemplateId, {
        owner_email:        ownerEmail,
        client_name:        `${clientData['firstName']} ${clientData['lastName']}`,
        client_email:       clientData['email'],
        client_phone:       clientData['phone'],
        client_national_id: clientData['nationalId'],
        client_data_json:   JSON.stringify(clientData, null, 2)
      })
    );
  }
}
