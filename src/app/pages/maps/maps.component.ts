import { Component, OnInit } from '@angular/core';
import {NgbDate, NgbCalendar,NgbTimeAdapter,NgbTimeStruct} from '@ng-bootstrap/ng-bootstrap';

import { NgbTime } from '@ng-bootstrap/ng-bootstrap/timepicker/ngb-time';
import { Router ,ActivatedRoute } from '@angular/router';
import { AuthOrdreService } from '../../auth-ordre.service';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {ttOrdre} from '../../models/ttOrdre.inter';

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {
  modelDs;
  dayformDs:string;
  monthformDs:string;
  dateClientDs;
  modelDr;
  dayformDr:string;
  monthformDr:string;
  dateClientDr;
  timeHr ;
  timeHs ;
  timeHsMnForm;
  timeHRMnForm;
  timeHsSForm;
  timeHRSForm
  timeHsForm;
  timeHrForm;

  nbclents=1;
  tTOrdre : ttOrdre[];
  commande:boolean=false;
  livraison:boolean=false;
  recouvrement:boolean=false;
  etatnotif:boolean=false;
  hngbS:string;
  mngbS:string;
  hngbR:string;
  mngbR:string;
  ssngbS;
  day1:string;
  month1:string;
  year1:string;
  date1: NgbDate  ;
  heurSngb:NgbTimeStruct ;
  day2:string;
  month2:string;
  year2:string;
  date2: NgbDate  ;
  Arr = Array;
  idOr= [];
  clients = [];
  error;
  i=0;
  ville = [];
  emailCO = localStorage.getItem('emailCO');
  observation=[];
  valueOfButton="Ajouter";
  commande1=[];
  commande2=[];
  livraison1=[];
  livraison2=[];
  recouvrement1=[];
  recouvrement2=[];
  ok;
  id;
  idOrdre;
  heureBS:string[];
  heureBR:string[];
  datePartsS:string[];
  datePartsR:string[];
  constructor(private router: Router, private route: ActivatedRoute,private auth:AuthOrdreService,private toastr: ToastrService ) { 
    this.id = this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.idOrdre = params['idOM'] ;
  
      
      
    });
  }

  ngOnInit() {

    this.auth.OrdrerModel = {
      monsieur:'',
      designation:'',
      dateS:'',
      dateR:'',
      heureS:'',
      heureR:'',
      chargementS:'',
      chargementR:'',

     
    }
    if(this.idOrdre){
      this.valueOfButton="Modifier";
      let formData1 = new FormData();
      formData1.append('idOrdre', this.idOrdre);
      this.auth.getcl2(formData1)
     
      .subscribe((data:ttOrdre[]) => {
        this.tTOrdre = data;
        console.log(data);
  
        if(data['message']!=="no"){
          console.log(this.tTOrdre);
          for (let entry of this.tTOrdre) {
            this.heureBS = entry.heureS.split("h");
            this.hngbS = this.heureBS[0];
            this.mngbS = this.heureBS[1];
            
              this.timeHs = {hour: Number(this.hngbS), minute: Number(this.mngbS)};
              this.heureBR = entry.heureR.split("h");
              this.hngbR = this.heureBR[0];
              this.mngbR = this.heureBR[1];
              
                this.timeHr = {hour: Number(this.hngbR), minute: Number(this.mngbR)};
             this.datePartsS = entry.dateS.split("/");
          this.day1 = this.datePartsS[2];
          console.log(this.day1);
        this.month1 = this.datePartsS[1];
          this.year1 = this.datePartsS[0];
          this.date1= new NgbDate(Number(this.year1),Number(this.month1), Number(this.day1));   
          this.modelDs=this.date1;
          this.datePartsR = entry.dateR.split("/");
          this.day2 = this.datePartsR[2];
          console.log(this.day2);
        this.month2 = this.datePartsR[1];
          this.year2 = this.datePartsR[0];
          this.date2= new NgbDate(Number(this.year2),Number(this.month2), Number(this.day2));   
          this.modelDr=this.date2;
          this.auth.OrdrerModel.monsieur=entry.monsieur;
          this.auth.OrdrerModel.designation=entry.designation;
          this.auth.OrdrerModel.chargementS=entry.chargementS;
          this.auth.OrdrerModel.chargementR=entry.chargementR;
         
       
         
    
   
   
   
    }

        }else{
          this.router.navigate(['login']);
          console.log(data['message']);
       
        }
        }, 
        error => this.error = error 
      );

      let formData2 = new FormData();
      formData2.append('idOrdre', this.idOrdre);
      this.auth.getcl3(formData2)
     
      .subscribe((data1:ttOrdre[]) => {
        this.tTOrdre = data1;
      
        if(data1['message']!=="no"){
         
        for (let entry of this.tTOrdre) {
         
           this.idOr[this.i]=entry.idordre;
            this.clients[this.i]=entry.client;
            this.ville[this.i]=entry.ville;

            this.commande1[this.i]=entry.commande;
            this.livraison1[this.i]=entry.livraison;
            this.recouvrement1[this.i]=entry.recouvrement;

            this.observation[this.i]=entry.observation;
            this.i++;
                   }
                   console.log("iiii"+this.i);
                   this.nbclents =this.i;
        
    }
  else{
    this.router.navigate(['login']);
    console.log(data1['message']);
 
  }
  }, 
  error => this.error = error 
);

}
    if(!this.emailCO){
     
      this.router.navigate(['login']);

    } 
  }

  ajouterClient(){
    
    this.etatnotif=false;
    this.commande2 = this.commande1.map(v => v === undefined ? false : v);
    this.livraison2 = this.livraison1.map(v => v === undefined ? false : v);
    this.recouvrement2 = this.recouvrement1.map(v => v === undefined ? false : v);
    console.log(this.recouvrement2);
    for (let i =0 ; i< this.nbclents ; i++)
    {
      if(this.commande2[i]==false&&this.livraison2[i]==false&&this.recouvrement2[i]==false){
        this.etatnotif=true;
       
      }else {
       
      }
    }
    if(this.etatnotif==true){
      this.toastr.warning('Veuillez vérifier vos paramètre !');
  
    }else {
    
      if(this.modelDs.day<10){
        this.dayformDs='0'+this.modelDs.day;
      }else {
        this.dayformDs=this.modelDs.day;
      }
     if(this.modelDs.month<10){
     this.monthformDs='0'+this.modelDs.month;
    }else {
      this.monthformDs=this.modelDs.month;
    }

    if(this.modelDr.day<10){
      this.dayformDr='0'+this.modelDr.day;
    }else {
      this.dayformDr=this.modelDr.day;
    }
   if(this.modelDr.month<10){
   this.monthformDr='0'+this.modelDr.month;
  }else {
    this.monthformDr=this.modelDr.month;
  }
  if(this.timeHs.hour<10){
    this.timeHsSForm='0'+this.timeHs.hour;
  }else {
    this.timeHsSForm=this.timeHs.hour;
  }
  if(this.timeHr.hour<10){
    this.timeHRSForm='0'+this.timeHr.hour;
  }else {
    this.timeHRSForm=this.timeHr.hour;
  }
  if(this.timeHs.minute<10){
    this.timeHsMnForm='0'+this.timeHs.minute;
  }else {
    this.timeHsMnForm=this.timeHs.minute;
  }
  if(this.timeHr.minute<10){
    this.timeHRMnForm='0'+this.timeHr.minute;
  }else {
    this.timeHRMnForm=this.timeHr.minute;
  }
      this.dateClientDr=this.modelDr.year+'/'+this.monthformDr+'/'+this.dayformDr;
 
      this.dateClientDs=this.modelDs.year+'/'+this.monthformDs+'/'+this.dayformDs;
   
      this.timeHsForm=this.timeHsSForm+"h"+this.timeHsMnForm;
    
      this.timeHrForm=this.timeHRSForm+"h"+this.timeHRMnForm;
      var idordreJs= JSON.stringify(this.idOr);
      var clientsJS= JSON.stringify(this.clients);
      var villeJS= JSON.stringify(this.ville);
      var commandeJS= JSON.stringify(this.commande2);
      var livraisonJS= JSON.stringify(this.livraison2);
      var recouvrementJS= JSON.stringify(this.recouvrement2);
      var observationJS= JSON.stringify(this.observation);
      if(this.idOrdre){
     
        let formData33 = new FormData();
        
        
        formData33.append('id',this.idOrdre);
        formData33.append('monsieur', this.auth.OrdrerModel.monsieur);
      formData33.append('designation', this.auth.OrdrerModel.designation);
      formData33.append('dateS', this.dateClientDs);
      formData33.append('dateR', this.dateClientDr);
      formData33.append('heureS', this.timeHsForm);
      formData33.append('heureR', this.timeHrForm);
      formData33.append('chargementS', this.auth.OrdrerModel.chargementS);
      formData33.append('chargementR', this.auth.OrdrerModel.chargementR);
      formData33.append('idor', idordreJs);
      formData33.append('client', clientsJS);
      formData33.append('ville', villeJS);
      formData33.append('commande', commandeJS);
      formData33.append('livraison', livraisonJS);
      formData33.append('recouvrement', recouvrementJS);
      formData33.append('observation', observationJS);
    
      
     
          this.auth.updateOrdre(formData33)
      
          .subscribe((data1) => {
            console.log(data1);
      
            if(data1['message']=="OK"){
              console.log(data1['message']);
              this.router.navigate(['ordreMission']);
            }else{
             
              this.toastr.error('Erreur', 'Bon de livraison ou facture pas  disponible', {
                timeOut: 3000
              });
           
            }
            }, 
            error => this.error = error 
          );
        }
     
      else {
      let formdata = new FormData();
     
      formdata.append('monsieur', this.auth.OrdrerModel.monsieur);
      formdata.append('designation', this.auth.OrdrerModel.designation);
      formdata.append('dateS', this.dateClientDs);
      formdata.append('dateR', this.dateClientDr);
      formdata.append('heureS', this.timeHsForm);
      formdata.append('heureR', this.timeHrForm);
      formdata.append('chargementS', this.auth.OrdrerModel.chargementS);
      formdata.append('chargementR', this.auth.OrdrerModel.chargementR);
      formdata.append('client', clientsJS);
      formdata.append('ville', villeJS);
      formdata.append('commande', commandeJS);
      formdata.append('livraison', livraisonJS);
      formdata.append('recouvrement', recouvrementJS);
      formdata.append('observation', observationJS);
      this.auth.ajouterOrdreM(formdata)
    
        .subscribe((data) => {
          console.log(data);
    
          if(data['message']=="OK"){
            console.log(data['message']);
            this.router.navigate(['ordreMission']);
          }else{
           
            this.toastr.error('Erreur', 'Bon de livraison ou facture deja disponible', {
              timeOut: 3000
            });
         
          }
          }, 
          error => this.error = error 
        );
      }
    }

  }




}
