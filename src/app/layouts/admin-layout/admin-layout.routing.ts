import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { AjouterComponent } from '../../ajouter/ajouter.component';
import { OrdreSoloComponent } from '../../ordre-solo/ordre-solo.component';
export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'clients',         component: TablesComponent },
    { path: 'ordreMission',          component: IconsComponent },
    { path: 'ajouter-Ordre-de-Mission',           component: MapsComponent },
    { path: 'ajouterClient',           component: AjouterComponent },
    { path: 'ordreSolo',           component: OrdreSoloComponent }
 
  
];
