import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { DatePickerModule } from 'primeng/datepicker';
import { Select } from 'primeng/select';
import { Country } from 'country-state-city';
import { ClientService } from '../../services/client.service';

interface CountryOption {
  name: string;
  code: string;
}

type FormData = Record<string, string | Date | null>;

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.html',
  styleUrls: ['./client-form.css'],
  imports: [FormsModule, InputTextModule, ButtonModule, DatePickerModule, Select]
})
export default class ClientFormComponent {
  private clientService = inject(ClientService);
  router = inject(Router);

  fields = [
    { name: 'firstName',    label: 'Prenume',          placeholder: 'Prenume',          type: 'text'   },
    { name: 'lastName',     label: 'Nume',              placeholder: 'Nume',             type: 'text'   },
    { name: 'email',        label: 'Email',             placeholder: 'Email',            type: 'text'   },
    { name: 'phone',        label: 'Telefon',           placeholder: 'Telefon',          type: 'text'   },
    { name: 'birthDate',    label: 'Data nașterii',     placeholder: 'Data nașterii',    type: 'date'   },
    { name: 'citizenship',  label: 'Cetățenie',         placeholder: 'Cetățenie',        type: 'select' },
    { name: 'idType',       label: 'Tip act',           placeholder: 'Tip act',          type: 'text'   },
    { name: 'nationalId',   label: 'CNP',               placeholder: 'CNP',              type: 'text'   },
    { name: 'series',       label: 'Serie',             placeholder: 'Serie',            type: 'text'   },
    { name: 'number',       label: 'Număr',             placeholder: 'Număr',            type: 'text'   },
    { name: 'birthCountry', label: 'Țara nașterii',     placeholder: 'Țara nașterii',    type: 'select' },
    { name: 'birthCity',    label: 'Orașul nașterii',   placeholder: 'Orașul nașterii',  type: 'text'   },
    { name: 'issuer',       label: 'Emitent',           placeholder: 'Emitent',          type: 'text'   },
    { name: 'issueDate',    label: 'Data emiterii',     placeholder: 'Data emiterii',    type: 'date'   },
    { name: 'expiryDate',   label: 'Data expirării',    placeholder: 'Data expirării',   type: 'date'   }
  ];

  readonly countryOptions: CountryOption[] = Country.getAllCountries().map(c => ({
    name: c.name,
    code: c.isoCode
  }));

  /** Plain object used by [(ngModel)] on PrimeNG components (DatePicker, Select). */
  formData: FormData = this.loadFromStorage();

  /** Signal mirrors formData and drives all computed() validation. */
  private values = signal<FormData>({ ...this.formData });

  touched = signal<Set<string>>(new Set());

  errors = computed(() => {
    const v = this.values();
    const str = (k: string) => (v[k] as string) ?? '';
    return {
      firstName:    !str('firstName')   ? 'Campo obbligatorio.' : str('firstName').length   < 2 ? 'Lunghezza minima: 2.' : '',
      lastName:     !str('lastName')    ? 'Campo obbligatorio.' : str('lastName').length    < 2 ? 'Lunghezza minima: 2.' : '',
      email:        !str('email')       ? 'Campo obbligatorio.' : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str('email')) ? 'Email non valida.' : '',
      phone:        !str('phone')       ? 'Campo obbligatorio.' : !/^[0-9+\-\s]+$/.test(str('phone')) ? 'Formato non valido.' : '',
      birthDate:    !v['birthDate']     ? 'Campo obbligatorio.' : '',
      citizenship:  !str('citizenship') ? 'Campo obbligatorio.' : '',
      idType:       !str('idType')      ? 'Campo obbligatorio.' : '',
      nationalId:   !str('nationalId')  ? 'Campo obbligatorio.' : !/^[0-9]{13}$/.test(str('nationalId')) ? 'Formato non valido (13 cifre).' : '',
      series:       !str('series')      ? 'Campo obbligatorio.' : str('series').length < 2 ? 'Lunghezza minima: 2.' : '',
      number:       !str('number')      ? 'Campo obbligatorio.' : '',
      birthCountry: !str('birthCountry')? 'Campo obbligatorio.' : '',
      birthCity:    !str('birthCity')   ? 'Campo obbligatorio.' : '',
      issuer:       !str('issuer')      ? 'Campo obbligatorio.' : '',
      issueDate:    !v['issueDate']     ? 'Campo obbligatorio.' : '',
      expiryDate:   !v['expiryDate']    ? 'Campo obbligatorio.' : '',
    } as Record<string, string>;
  });

  isValid = computed(() => Object.values(this.errors()).every(e => !e));

  constructor() {
    effect(() => {
      const v = this.values();
      const toISO = (k: string) => v[k] instanceof Date ? (v[k] as Date).toISOString() : null;
      localStorage.setItem('client-data', JSON.stringify({
        ...v,
        birthDate:  toISO('birthDate'),
        issueDate:  toISO('issueDate'),
        expiryDate: toISO('expiryDate'),
      }));
    });
  }

  private loadFromStorage(): FormData {
    const saved = localStorage.getItem('client-data');
    const defaults: FormData = {
      idType: '', lastName: '', firstName: '', email: '', phone: '',
      citizenship: '', nationalId: '', series: '', number: '',
      birthCountry: '', birthCity: '', issuer: '',
      birthDate: null, issueDate: null, expiryDate: null
    };
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        for (const k of ['birthDate', 'issueDate', 'expiryDate']) {
          if (parsed[k]) parsed[k] = new Date(parsed[k]);
        }
        return { ...defaults, ...parsed };
      } catch {}
    }
    return defaults;
  }

  /** Called from native input (input) event. */
  onTextChange(name: string, value: string): void {
    this.formData[name] = value;
    this.values.update(v => ({ ...v, [name]: value }));
    this.markTouched(name);
  }

  /** Called from (ngModelChange) on PrimeNG components. */
  onModelChange(name: string, value: Date | string | null): void {
    this.values.update(v => ({ ...v, [name]: value }));
    this.markTouched(name);
  }

  markTouched(name: string): void {
    this.touched.update(s => new Set([...s, name]));
  }

  isTouched(name: string): boolean {
    return this.touched().has(name);
  }

  getError(name: string): string {
    return this.errors()[name] ?? '';
  }

  getOptions(name: string): CountryOption[] {
    if (name === 'citizenship' || name === 'birthCountry') return this.countryOptions;
    return [];
  }

  getTextValue(name: string): string {
    return (this.formData[name] as string) ?? '';
  }

  onSubmit(): void {
    this.touched.set(new Set(this.fields.map(f => f.name)));
    if (this.isValid()) {
      this.clientService.add(this.values() as any).subscribe({
        next: () => this.router.navigate(['homepage/residence']),
        error: (error) => console.error('Error saving client:', error)
      });
    }
  }

  nextPage(): void {
    this.router.navigate(['homepage/residence']);
  }

  clientsPage(): void {
    this.router.navigate(['homepage/clients']);
  }
}
