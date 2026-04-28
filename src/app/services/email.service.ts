import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { environment } from '../../environments/environment';
import { from, Observable } from 'rxjs';

const { publicKey, serviceId, inviteTemplateId, confirmationTemplateId, ownerEmail, appUrl } =
  (environment as any).emailjs
    ? { ...environment.emailjs, appUrl: environment.appUrl }
    : { publicKey: '', serviceId: '', inviteTemplateId: '', confirmationTemplateId: '', ownerEmail: '', appUrl: '' };

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor() {
    emailjs.init({ publicKey });
  }

  /**
   * Generates a URL-safe token that encodes the recipient email.
   * Decoded client-side on the /register page — no server needed.
   */
  generateToken(email: string): string {
    return btoa(`${email}:${Date.now()}`);
  }

  /**
   * Decodes a token back to email + timestamp.
   * Returns null if the token is malformed or older than 7 days.
   */
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

  /**
   * Sends an invitation email to the client with a personalised registration link.
   * EmailJS template variables: {{to_email}}, {{register_link}}
   */
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

  /**
   * Sends a confirmation email to the owner when a client completes registration.
   * EmailJS template variables: {{owner_email}}, {{client_name}}, {{client_email}},
   *   {{client_phone}}, {{client_national_id}}, {{client_data_json}}
   */
  sendRegistrationConfirmation(clientData: Record<string, unknown>): Observable<unknown> {
    return from(
      emailjs.send(serviceId, confirmationTemplateId, {
        owner_email:      ownerEmail,
        client_name:      `${clientData['firstName']} ${clientData['lastName']}`,
        client_email:     clientData['email'],
        client_phone:     clientData['phone'],
        client_national_id: clientData['nationalId'],
        client_data_json: JSON.stringify(clientData, null, 2)
      })
    );
  }
}
