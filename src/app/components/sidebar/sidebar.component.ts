import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
  
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-red', class: '' },
    { path: '/user-profile', title: 'Admin Profile',  icon:'ni-single-02 text-red', class: '' },
    { path: '/clients', title: 'Clients',  icon:'ni-bullet-list-67 text-red', class: ''  },
    { path: '/ajouterClient', title: 'Ajouter Client', icon:'ni-single-02 text-red', class: ''  },
    { path: '/ordreMission', title: 'Ordre de Mission',  icon:'ni-bullet-list-67 text-red', class: ''  },
    { path: '/ajouter-Ordre-de-Mission', title: 'Ajouter Ordre de Mission',icon:"ni ni-collection text-red", class: ''  },
    { path: '/ordreSolo', title: 'Ordre de Mission',icon:"ni ni-collection text-red", class: ''  }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  
  }
  deconnecter(){
    localStorage.removeItem('idCO');
    localStorage.removeItem('emailCO');
 
   
    this.router.navigate(['/login']);
  }
}
