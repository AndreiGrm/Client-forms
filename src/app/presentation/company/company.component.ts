import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

interface CompanyValues {
  name: string;
  cui: string;
  tradeRegisterNumber: string;
  mainCaen: string;
  address: string;
}

@Component({
  selector: 'app-company',
  imports: [InputTextModule, ButtonModule],
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export default class CompanyComponent {
  router = inject(Router);

  fields = [
    { name: 'name',                label: 'Denumire firmă',           placeholder: 'Denumire firmă' },
    { name: 'cui',                 label: 'CUI',                      placeholder: 'CUI' },
    { name: 'tradeRegisterNumber', label: 'Nr. Registrul Comerțului', placeholder: 'Nr. Registrul Comerțului' },
    { name: 'mainCaen',            label: 'Cod CAEN',                 placeholder: 'Cod CAEN' },
    { name: 'address',             label: 'Adresă',                   placeholder: 'Adresă' }
  ];

  private readonly EMPTY: CompanyValues = {
    name: '', cui: '', tradeRegisterNumber: '', mainCaen: '', address: ''
  };

  formValues = signal<CompanyValues>(this.loadFromStorage());
  touched    = signal<Set<string>>(new Set());

  errors = computed(() => {
    const v = this.formValues();
    return {
      name:                !v.name ? 'Campo obbligatorio.' :
                           v.name.length < 2 ? 'Lunghezza minima: 2.' : '',
      cui:                 !v.cui ? 'Campo obbligatorio.' :
                           !/^[0-9]{8,10}$/.test(v.cui) ? 'Formato non valido (8-10 cifre).' : '',
      tradeRegisterNumber: !v.tradeRegisterNumber ? 'Campo obbligatorio.' :
                           v.tradeRegisterNumber.length < 3 ? 'Lunghezza minima: 3.' : '',
      mainCaen:            !v.mainCaen ? 'Campo obbligatorio.' :
                           !/^[0-9]{4}$/.test(v.mainCaen) ? 'Formato non valido (4 cifre).' : '',
      address:             !v.address ? 'Campo obbligatorio.' :
                           v.address.length < 5 ? 'Lunghezza minima: 5.' : '',
    } as Record<string, string>;
  });

  isValid = computed(() => Object.values(this.errors()).every(e => !e));

  constructor() {
    effect(() => {
      localStorage.setItem('company-data', JSON.stringify(this.formValues()));
    });
  }

  private loadFromStorage(): CompanyValues {
    const saved = localStorage.getItem('company-data');
    if (saved) {
      try { return { ...this.EMPTY, ...JSON.parse(saved) }; } catch {}
    }
    return { ...this.EMPTY };
  }

  getValue(name: string): string {
    return (this.formValues() as unknown as Record<string, string>)[name] ?? '';
  }

  updateField(name: string, value: string): void {
    this.formValues.update(v => ({ ...v, [name]: value }));
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

  onSubmit(): void {
    this.touched.set(new Set(this.fields.map(f => f.name)));
    if (this.isValid()) {
      this.router.navigate(['homepage/client']);
    }
  }

  nextPage(): void {
    this.onSubmit();
  }

  previousPage(): void {
    this.router.navigate(['homepage/residence']);
  }
}
