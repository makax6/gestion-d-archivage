import { Injectable } from '@angular/core';



import { Admin } from './models/admin.model';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthAdminService {
  
  AdminModel: Admin;
  constructor(private http: HttpClient) { 


    
  }
  connecter(formData: object) {


	
    return this.http.post('http://localhost/friga/login.php', formData);
  }
  getProfile(formData: object) {


	
    return this.http.post('http://localhost/friga/getProfile.php', formData);
  }
  updatePicture(formData: object) {
    return this.http.post('http://localhost/friga/profilePhoto.php', formData);

  }
  updateProfile(formData: object) {
    return this.http.post('http://localhost/friga/updateProfile.php', formData);

  }
}
