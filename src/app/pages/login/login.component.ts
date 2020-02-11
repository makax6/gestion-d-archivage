import { Component,OnInit} from '@angular/core';
import { AuthAdminService } from '../../auth-admin.service';


import 'rxjs/Rx';

import "rxjs/add/operator/map";


import { Router  } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  message:boolean=false;
  hide:boolean=true;
  show:boolean=false;
  idCo;
emailCo;
emailCO = localStorage.getItem('emailCO');
remembervAL = localStorage.getItem('remember');
  error: string;
  remember:boolean=false;
  messageEmail:boolean=false;
  messageMdp:boolean=false;
  constructor(private auth:AuthAdminService,private router: Router) {


  }

  ngOnInit() {
    if(this.emailCO){
      console.log(this.emailCO);
      this.router.navigate(['dashboard']);

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
    if(this.remembervAL){
      console.log(this.remembervAL);
      this.auth.AdminModel.emailAdmin =this.remembervAL;
      this.remember = true;
    } 

}
loginUser(){

          
      
  let formData = new FormData();

  formData.append('emailAdmin', this.auth.AdminModel.emailAdmin);
  formData.append('mdpAdmin', this.auth.AdminModel.mdpAdmin);

  console.log(formData);
  
  this.auth.connecter(formData)
 
  .subscribe((data) => {
    console.log(data);
     if(data['message']=="success"){
      this.idCo=data['id'];
      this.emailCo=data['email'];
     if(this.remember==true){
      console.log(this.remember);
      localStorage.setItem('remember', this.emailCo);
     }else {
      console.log(this.remember);
      localStorage.removeItem('remember');
     }
  
      localStorage.setItem('idCO', this.idCo);
      localStorage.setItem('emailCO', this.emailCo);
      console.log("idCO"+this.idCo);
      console.log("emailCO"+this.emailCo);
      this.router.navigate(['dashboard']);
     
    }
    
    else{
 
        console.log(data['message']);
        this.messageEmail=true;
        this.messageMdp=true;
       this.auth.AdminModel.mdpAdmin="";
            
  
    }

    }, 
    error => this.error = error 
  );

  }
  dataChanged(){

    this.messageEmail=false;
    this.messageMdp=false;
    this.message=false;
  }
  toggleEditable(event) {
    if ( event.target.checked ) {
        this.remember = true;
        console.log(this.remember);
   }else {
    this.remember = false;
    console.log(this.remember);
   }
}
hideAndShow(){
  if(this.hide){
    this.hide=false;
    this.show=true;
  }else {
    this.hide=true;
    this.show=false;
  }
  
    }

}
