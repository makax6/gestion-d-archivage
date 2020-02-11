import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { ToastrModule } from 'ngx-toastr';
import { AuthAdminService } from './auth-admin.service';
import { AuthClientService } from './auth-client.service';
import { MessageService } from './message-service.service';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { AuthOrdreService } from './auth-ordre.service';


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,

    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot(),
    
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    
    

  ],
  providers: [AuthAdminService,AuthClientService,MessageService,AuthOrdreService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
