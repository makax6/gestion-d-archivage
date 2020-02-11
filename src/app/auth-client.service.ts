import { Injectable } from '@angular/core';

import { Client } from './models/client.model';

import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AuthClientService {
  ClientModel: Client;
  constructor(private http: HttpClient) { }
  ajouterCl(formData: object) {


	
    return this.http.post('http://localhost/friga/ajouteClient.php', formData);
  }
  getCl(formData: object) {


	
    return this.http.post('http://localhost/friga/getClient.php', formData);
  }
  getAll() {


	
    return this.http.get('http://localhost/friga/getAll.php');
  }
  getFilter(formData: object) {


	
    return this.http.post('http://localhost/friga/getdt.php', formData);
  }
  deleteClient(formData: object) {


	
    return this.http.post('http://localhost/friga/deleteClient.php', formData);
  }
 getcl2(formData: object) {


	
    return this.http.post('http://localhost/friga/getcl.php', formData);
  }
  updateClient(formData: object) {


	
    return this.http.post('http://localhost/friga/updateClient.php', formData);
  }
  getNbCl() {


	
    return this.http.get('http://localhost/friga/getNbCl.php');
  }
  getNEWCl() {


	
    return this.http.get('http://localhost/friga/getNewCl.php');
  }
  getMtQtMom() {


	
    return this.http.get('http://localhost/friga/getNewMQ.php');
  }
  getCbMtQtMonth() {


	
    return this.http.get('http://localhost/friga/getCourbeM.php');
  }
  getCbMtQt5y() {


	
    return this.http.get('http://localhost/friga/getCourbeY.php');
  }
}
