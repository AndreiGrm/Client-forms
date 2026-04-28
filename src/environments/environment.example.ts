// Copy this file to environment.ts (dev) or environment.prod.ts (prod) and fill in real values.
// Never commit environment.ts or environment.prod.ts — they are gitignored.
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/',
  appUrl: 'http://localhost:4200',
  emailjs: {
    publicKey:              'YOUR_EMAILJS_PUBLIC_KEY',
    serviceId:              'YOUR_EMAILJS_SERVICE_ID',
    inviteTemplateId:       'YOUR_INVITE_TEMPLATE_ID',
    confirmationTemplateId: 'YOUR_CONFIRMATION_TEMPLATE_ID'
  }
};
