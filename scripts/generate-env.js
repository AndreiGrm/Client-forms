// Generates src/environments/environment.prod.ts from Vercel environment variables.
// Required env vars: APP_URL, API_URL, EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID,
//                    EMAILJS_INVITE_TEMPLATE_ID, EMAILJS_CONFIRMATION_TEMPLATE_ID
const fs   = require('fs');
const path = require('path');

const outPath = path.join(__dirname, '..', 'src', 'environments', 'environment.prod.ts');

// If the file already exists (e.g. local dev), skip generation.
// On Vercel the file won't exist (gitignored), so generation runs from env vars.
if (fs.existsSync(outPath)) {
  console.log('environment.prod.ts already exists, skipping generation.');
  process.exit(0);
}

const required = [
  'APP_URL', 'API_URL',
  'EMAILJS_PUBLIC_KEY', 'EMAILJS_SERVICE_ID',
  'EMAILJS_INVITE_TEMPLATE_ID', 'EMAILJS_CONFIRMATION_TEMPLATE_ID'
];

const missing = required.filter(k => !process.env[k]);
if (missing.length) {
  console.error('Missing environment variables:', missing.join(', '));
  process.exit(1);
}

const content = `export const environment = {
  production: true,
  apiUrl: '${process.env.API_URL}',
  appUrl: '${process.env.APP_URL}',
  emailjs: {
    publicKey:              '${process.env.EMAILJS_PUBLIC_KEY}',
    serviceId:              '${process.env.EMAILJS_SERVICE_ID}',
    inviteTemplateId:       '${process.env.EMAILJS_INVITE_TEMPLATE_ID}',
    confirmationTemplateId: '${process.env.EMAILJS_CONFIRMATION_TEMPLATE_ID}'
  }
};
`;

fs.writeFileSync(outPath, content, 'utf8');
console.log('Generated', outPath);
