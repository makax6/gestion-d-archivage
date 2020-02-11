import { Injectable } from '@angular/core';
import { Ordre } from './models/ordre.model';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthOrdreService {
  OrdrerModel: Ordre;
  constructor(private http: HttpClient) { }
  ajouterOrdreM(formData: object) {


	
    return this.http.post('http://localhost/friga/ajouteOrdreM.php', formData);
  }
  getAll() {


	
    return this.http.get('http://localhost/friga/getAllOrder.php');
  }
  deleteOrdre(formData: object) {


	
    return this.http.post('http://localhost/friga/deleteOrdreM.php', formData);
  }
  getFilter(formData: object) {


	
    return this.http.post('http://localhost/friga/getOrdreDate.php', formData);
  }
  getcl2(formData: object) {


	
    return this.http.post('http://localhost/friga/getclOrdre.php', formData);
  }
  getcl3(formData: object) {


	
    return this.http.post('http://localhost/friga/getclOrdre2.php', formData);
  }
  updateOrdre(formData: object) {


	
    return this.http.post('http://localhost/friga/updateOrdre.php', formData);
  }
}
