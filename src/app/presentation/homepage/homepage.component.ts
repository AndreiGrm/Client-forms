import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-homepage',
  imports: [MenuModule, BadgeModule, RippleModule, AvatarModule, RouterOutlet, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export default class HomepageComponent implements OnInit {
  router = inject(Router);
  items: MenuItem[] | undefined;

  ngOnInit(): void {
    this.items = [
      { separator: true },
      {
        label: 'General',
        items: [
          { label: 'Dashboard', icon: 'pi pi-home',      routerLink: ['dashboard']    },
          { label: 'Clienți',   icon: 'pi pi-users',     routerLink: ['clients']      },
          { label: 'Formular',  icon: 'pi pi-clipboard', routerLink: ['client-form']  }
        ]
      },
      { separator: true },
      {
        label: 'Cont',
        items: [
          { label: 'Logout', icon: 'pi pi-sign-out', routerLink: ['/'] }
        ]
      }
    ];
  }
}
