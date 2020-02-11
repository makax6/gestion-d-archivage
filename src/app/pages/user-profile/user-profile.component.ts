import {Component, OnInit} from '@angular/core';
import { Router  } from '@angular/router';
import { AuthAdminService } from '../../auth-admin.service';
import { MessageService } from '../../message-service.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';


@Component({

  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  
  emailCO = localStorage.getItem('emailCO');
  idCO = localStorage.getItem('idCO');
  timeStamp=(new Date()).getTime();
  selectedFile:File =null;
  urlImgClient:string="";
  messageAlerte;
  address: Object;
  imgClient2;
  imgClient;
  formatedadress;
  error;
  constructor(private data: MessageService,private router: Router,private auth:AuthAdminService,private toastr: ToastrService ) { }

  ngOnInit() {

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

    if(!this.emailCO){
     
      this.router.navigate(['login']);

    } 
    
    let formData1 = new FormData();
    formData1.append('email', this.emailCO);
    
    this.auth.getProfile(formData1)
   
    .subscribe((data) => {
      console.log(data);

      if(data['message']=="ok"){
        console.log(data['message']);
        
        this.auth.AdminModel.nomAdmin=data['nom'];
        this.auth.AdminModel.prenomAdmin=data['prenom'];
        this.auth.AdminModel.emailAdmin=data['email'];
        this.auth.AdminModel.ageAdmin=data['age'];
        this.auth.AdminModel.adresseAdmin=data['adresse'];
        this.auth.AdminModel.posteOccupeAdmin =data['posteOccupe'];
        this.auth.AdminModel.societeAdmin=data['societe'];
        this.auth.AdminModel.aProposAdmin=data['aPropos'];
        this.imgClient=data['image'];
        this.urlImgClient ='http://localhost/friga/images/'+this.imgClient;
      
       
      }else{
        this.router.navigate(['login']);
        console.log(data['message']);
     
      }
      }, 
      error => this.error = error 
    );
  
  }
  onFileSelected(event){
    
  
    this.selectedFile = <File>event.target.files[0];
    console.log(event.target.files.length);
    if( event.target.files.length > 0) {
      
      console.log(this.selectedFile);
   
   
    let formData2 = new FormData();
    formData2.append('email', this.emailCO);
    formData2.append('id', this.idCO);
    formData2.append('photo', this.selectedFile,this.selectedFile.name);
      this.auth.updatePicture(formData2)
  
      .subscribe((data2) => {
        console.log(data2);
  
        if(data2['message']=="updateokkk"){
          this.timeStamp = (new Date()).getTime();
 
          console.log(data2['message']);
          this.imgClient2=data2['image'];
  
          this.urlImgClient = 'http://localhost/friga/images/'+this.imgClient2 ;
          this.data.changeMessage3( this.urlImgClient+ '?' + this.timeStamp);
          console.log(this.urlImgClient );
          this.toastr.success( 'mise à jour réussie!');
        
         
        }
        else if(data2['message']=="size"){
     
          this.messageAlerte="Choisissez une image inférieure à 500Ko";
          this.toastr.error('Erreur', this.messageAlerte, {
            timeOut: 3000
          });
      
        
         

        }
        else if(data2['message']=="extension"){
    
          this.messageAlerte="Seules les photos enregistrées au format JPG, PNG, GIF,JPEG sont autorisées.";
          this.toastr.error('Erreur', this.messageAlerte, {
            timeOut: 3000
          });
        

        }
        else if(data2['message']=="error"){
    
         
          this.messageAlerte="erreur uploading photo try again pls";
          this.toastr.error('Erreur', this.messageAlerte, {
            timeOut: 3000
          });
        }
        else{
     
          
          this.router.navigate(['/404']);
          console.log(data2['message']);
    
          
        }
        }, 
        error => this.error = error 
      );
  
    }
  }
  onFileSelected2(){
    if(this.timeStamp) {
      return this.urlImgClient + '?' + this.timeStamp;
   }
   return this.urlImgClient;

  }
  updateAdmin(){
  
    let formData3 = new FormData();
    formData3.append('email', this.emailCO);
    formData3.append('nom',  this.auth.AdminModel.nomAdmin);
    formData3.append('prenom', this.auth.AdminModel.prenomAdmin);
    formData3.append('age', this.auth.AdminModel.ageAdmin);
    formData3.append('adresse', this.auth.AdminModel.adresseAdmin);
    formData3.append('posteOccupe', this.auth.AdminModel.posteOccupeAdmin);
    formData3.append('societe', this.auth.AdminModel.societeAdmin);
    formData3.append('aPropos', this.auth.AdminModel.aProposAdmin);
      this.auth.updateProfile(formData3)
  
      .subscribe((data) => {
        console.log(data);
  
        if(data['message']=="updateokkk"){
          console.log(data['message']);
          this.toastr.success( 'mise à jour réussie!');
          this.data.changeMessage(data['nom']);
          this.data.changeMessage2(data['prenom']);
        }else{
         
          this.toastr.error('Erreur', 'Erreur', {
            timeOut: 3000
          });
       
        }
        }, 
        error => this.error = error 
      );
    }
 

}
