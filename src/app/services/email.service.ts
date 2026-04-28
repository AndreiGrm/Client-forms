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

  generateToken(email: string): string {
    return btoa(`${email}:${Date.now()}`);
  }

  decodeToken(token: string): { email: string } | null {
    try {
      const decoded = atob(token);
      const colonIndex = decoded.lastIndexOf(':');
      const email = decoded.substring(0, colonIndex);
      const timestamp = Number(decoded.substring(colonIndex + 1));
      const sevenDaysMs = 7 * 24 * 60 * 60 * 1000;
      if (!email || isNaN(timestamp) || Date.now() - timestamp > sevenDaysMs) return null;
      return { email };
    } catch {
      return null;
    }
  }

  sendInvitation(recipientEmail: string): Observable<unknown> {
    const token = this.generateToken(recipientEmail);
    const registerLink = `${environment.appUrl}/register?token=${token}`;

    return from(
      emailjs.send(serviceId, inviteTemplateId, {
        to_email:      recipientEmail,
        register_link: registerLink
      })
    );
  }

  sendRegistrationConfirmation(clientData: Record<string, unknown>): Observable<unknown> {
    const ownerEmail = this.authService.ownerEmail();

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
