import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Router } from '@angular/router';
import { AuthAdminService } from '../../auth-admin.service';

import { Subscription } from 'rxjs';

import { MessageService } from '../../message-service.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  subscription: Subscription;
  emailCO = localStorage.getItem('emailCO');

  nom:string;
  prenom:string;

  error;
  timeStamp=(new Date()).getTime();
  nomPro;
  prenomPro;
  photoPro;
  urlImgClient;
  public focus;
  public listTitles: any[];
  public location: Location;
  constructor(location: Location,private data: MessageService ,private element: ElementRef, private router: Router,private auth:AuthAdminService) {


    this.location = location;
  }

  ngOnInit() {
    this.data.currentMessage.subscribe(message => this.nom = message)
    this.data.currentMessage1.subscribe(message => this.prenom = message)
    this.data.currentMessage2.subscribe(message => this.urlImgClient = message)
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    if(!this.emailCO){
      console.log(this.emailCO!);
      this.router.navigate(['login']);
  
    } 
    this.auth.AdminModel = {
      id:'',
      emailAdmin: '',
      mdpAdmin:'',
      nomAdmin: '',
      prenomAdmin: '',
      ageAdmin:'',
      adresseAdmin:'',
      posteOccupeAdmin:'',
      societeAdmin:'',
      aProposAdmin:'',
      photoAdmin:''
      
     
    }

    let formData1 = new FormData();
    formData1.append('email', this.emailCO);
    
    this.auth.getProfile(formData1)
   
    .subscribe((data) => {
      console.log(data);

      if(data['message']=="ok"){
        console.log(data['message']);
        
        this.nomPro=data['nom'];
        this.prenomPro=data['prenom'];
       
        this.photoPro=data['image'];
        this.urlImgClient ='http://localhost/friga/images/'+this.photoPro;
        this.data.changeMessage(this.nomPro);
        this.data.changeMessage2(this.prenomPro);
        this.data.changeMessage3(this.urlImgClient);
      }else{
        this.router.navigate(['login']);
        console.log(data['message']);
     
      }
      }, 
      error => this.error = error 
    );
  }
 
  getTitle(){
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if(titlee.charAt(0) === '#'){
        titlee = titlee.slice( 1 );
    }

    for(var item = 0; item < this.listTitles.length; item++){
        if(this.listTitles[item].path === titlee){
            return this.listTitles[item].title;
        }
    }
    return 'Dashboard';
  }

  deconnecter(){
    localStorage.removeItem('idCO');
    localStorage.removeItem('emailCO');
  

    this.router.navigate(['/login']);
  }
  onFileSelected2(){
    if(this.timeStamp) {
      return this.urlImgClient + '?' + this.timeStamp;
   }
   return this.urlImgClient;

  }

}
