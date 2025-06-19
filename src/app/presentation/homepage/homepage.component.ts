import { Component, inject, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { LoginService } from '../../services/login.service';
import { Router, RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { BadgeModule } from 'primeng/badge';
import { RippleModule } from 'primeng/ripple';
import { RouterOutlet } from '@angular/router'

import { AvatarModule } from 'primeng/avatar';
@Component({
  selector: 'app-residence',
  imports: [
    InputTextModule, MenuModule, BadgeModule, RippleModule, AvatarModule, RouterOutlet, RouterModule
  ],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export default class HomepageComponent implements OnInit {
  router = inject(Router)
  visible: boolean = true;
    routerLinkActive: string = 'active';
  items: MenuItem[] | undefined;

    ngOnInit() {
        this.items = [
            {
                separator: true
            },
            {
                label: 'Things',
                items: [
                    {
                        label: 'Clients',
                        icon: 'pi pi-user',
                        routerLink: ['clients'] 
                    },
                    {
                        label: 'Form',
                        icon: 'pi pi-clipboard',
                        routerLink: ['client-form']
                    }
                ]
            },
            {
                separator: true
            },
            {
                label: 'Account',
                items: [
                    {
                        label: 'Logout',
                        icon: 'pi pi-sign-out',
                        routerLink: ['/'] 
                    }
                ]
            },
        ];
    }
  
}
