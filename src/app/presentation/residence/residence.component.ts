import { Component, computed, effect, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

interface ResidenceValues {
  country: string;
  cityOrSector: string;
  type: string;
  streetType: string;
  streetName: string;
  number: string;
  building: string;
  staircase: string;
  floor: string;
  apartment: string;
}

@Component({
  selector: 'app-residence',
  imports: [InputTextModule, ButtonModule],
  templateUrl: './residence.component.html',
  styleUrl: './residence.component.css'
})
export default class ResidenceComponent {
  router = inject(Router);

  fields = [
    { name: 'country',       label: 'Țară',           placeholder: 'Țară' },
    { name: 'cityOrSector',  label: 'Oraș / Sector',  placeholder: 'Oraș / Sector' },
    { name: 'type',          label: 'Tip locuință',   placeholder: 'Tip locuință' },
    { name: 'streetType',    label: 'Tip stradă',     placeholder: 'Tip stradă' },
    { name: 'streetName',    label: 'Nume stradă',    placeholder: 'Nume stradă' },
    { name: 'number',        label: 'Număr',          placeholder: 'Număr' },
    { name: 'building',      label: 'Bloc',           placeholder: 'Bloc' },
    { name: 'staircase',     label: 'Scară',          placeholder: 'Scară' },
    { name: 'floor',         label: 'Etaj',           placeholder: 'Etaj' },
    { name: 'apartment',     label: 'Apartament',     placeholder: 'Apartament' }
  ];

  private readonly EMPTY: ResidenceValues = {
    country: '', cityOrSector: '', type: '', streetType: '',
    streetName: '', number: '', building: '', staircase: '', floor: '', apartment: ''
  };

  formValues = signal<ResidenceValues>(this.loadFromStorage());
  touched    = signal<Set<string>>(new Set());

  errors = computed(() => {
    const v = this.formValues();
    return {
      country:             !v.country       ? 'Campo obbligatorio.' : '',
      cityOrSector:        !v.cityOrSector  ? 'Campo obbligatorio.' : '',
      type:                !v.type          ? 'Campo obbligatorio.' : '',
      streetType:          !v.streetType    ? 'Campo obbligatorio.' : '',
      streetName:          !v.streetName    ? 'Campo obbligatorio.' :
                           v.streetName.length < 2 ? 'Lunghezza minima: 2.' : '',
      number:              !v.number        ? 'Campo obbligatorio.' :
                           Number(v.number) < 1 ? 'Valore minimo: 1.' : '',
      building:            v.building.length  > 10 ? 'Lunghezza massima: 10.' : '',
      staircase:           v.staircase.length > 5  ? 'Lunghezza massima: 5.'  : '',
      floor:               v.floor && Number(v.floor) < 0     ? 'Valore minimo: 0.' : '',
      apartment:           v.apartment && Number(v.apartment) < 1 ? 'Valore minimo: 1.' : '',
    } as Record<string, string>;
  });

  isValid = computed(() => Object.values(this.errors()).every(e => !e));

  constructor() {
    effect(() => {
      localStorage.setItem('residence-data', JSON.stringify(this.formValues()));
    });
  }

  private loadFromStorage(): ResidenceValues {
    const saved = localStorage.getItem('residence-data');
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

  nextPage(): void {
    this.touched.set(new Set(this.fields.map(f => f.name)));
    if (this.isValid()) {
      this.router.navigate(['homepage/company']);
    }
  }

  previousPage(): void {
    this.router.navigate(['homepage/client-form']);
  }
}
