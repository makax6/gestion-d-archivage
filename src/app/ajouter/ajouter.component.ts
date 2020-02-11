import { Component, OnInit } from '@angular/core';
import { Router ,ActivatedRoute } from '@angular/router';
import { AuthClientService } from '../auth-client.service';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import {ClientInt} from '../models/client.interf';
@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter.component.html',
  styleUrls: ['./ajouter.component.scss']
})
export class AjouterComponent implements OnInit {
  date1: NgbDate  ;
  timeStamp=(new Date()).getTime();
  dateParts1:string[];
  day1:string;
  month1:string;
  year1:string;
  dayform:string;
  monthform:string;
  client1;
  region1;
  ok;
  etatChangeblModif:boolean=false;
  etatChangefacModif:boolean=false;
  ok2;
  valueOfButton="Ajouter";
  validationbl:boolean=false;
  validationbl1:boolean=false;
  error;
  clients : ClientInt[];
  dateClient;
  selectedFile:File =null;
  selectedFile1:File =null;
  etatProduit:boolean=false;
  sortOrders: string[] = ["TCH", "FA", "FOP"];
  selectedSortOrder: string = "Type produit";
  etatProduit1:boolean=false;
  sortOrders1: string[] = ["non réglé", "réglé"];
  selectedSortOrder1: string = "Totale Règlement";
  sortOrders2: string[] = ["Chèque", "Espèce"];
  selectedSortOrder2: string = "Mode de règlement";
  etatProduit2:boolean=false;
year;
file1:File; 
file2:File;
model;
id;
nblAct;
  emailCO = localStorage.getItem('emailCO');
  constructor(calendar: NgbCalendar,private router: Router, private route: ActivatedRoute,private auth:AuthClientService,private toastr: ToastrService) { 


    this.id = this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.nblAct = params['nbl'] ;
     
      
      
    });
  }

  ngOnInit() {
    this.auth.ClientModel = {
      dateC:'',
      nBl:'',
      nFac:'FAC-',
      codeClient:'',
      clientName:'',
      region:'',
      modeReg:'',
      produit:'',
      quantite:'',
      totReg:'',
     
      montant:'',
      fichierBl:'',
      fichierFac:'',
      
     
    }
    if(this.nblAct){
      this.valueOfButton="Modifier";
      let formData1 = new FormData();
      formData1.append('nbl', this.nblAct);
      this.validationbl =true;
      this.validationbl1 =true;
      this.auth.getcl2(formData1)
     
      .subscribe((data:ClientInt[]) => {
        this.clients = data;
        console.log(data);
  
        if(data['message']!=="no"){
          console.log(this.clients);
          for (let entry of this.clients) {
             this.dateParts1 = entry.dateC.split("/");
          this.day1 = this.dateParts1[2];
          console.log(this.day1);
        this.month1 = this.dateParts1[1];
          this.year1 = this.dateParts1[0];
          this.date1= new NgbDate(Number(this.year1),Number(this.month1), Number(this.day1));   
          this.model=this.date1;
       
          this.auth.ClientModel.nBl=entry.nBl;
          this.auth.ClientModel.nFac=entry.nFac;
          this.auth.ClientModel.codeClient=entry.codeClient;
          this.auth.ClientModel.clientName=entry.client;
          this.auth.ClientModel.region =entry.region;
       
         this.ChangeSortOrder2(entry.modeReg);
         this.ChangeSortOrder(entry.produit);
          this.auth.ClientModel.quantite =entry.quantite;
          this.ChangeSortOrder1(entry.totReg);
          this.auth.ClientModel.montant=entry.montant;
   
          this.file1 = new File(["foo"],'http://localhost/friga/bl/'+entry.fichierBl);
          this.file2 = new File(["foo"],'http://localhost/friga/factures/'+entry.fichierFac);
          console.log(this.file1.name );
          this.auth.ClientModel.fichierBl=this.file1.name ;
      this.ok=entry.fichierBl;
      this.ok2=entry.fichierFac;
   
   
    }

        }else{
          this.router.navigate(['login']);
          console.log(data['message']);
       
        }
        }, 
        error => this.error = error 
      );

    }
   

    if(!this.emailCO){
     
      this.router.navigate(['login']);

    } 
  }
  ChangeSortOrder(newSortOrder: string) { 
    this.selectedSortOrder = newSortOrder;
    this.etatProduit=true;
  }
  ChangeSortOrder1(newSortOrder: string) { 
    this.selectedSortOrder1 = newSortOrder;
    this.etatProduit1=true;
  }
  ChangeSortOrder2(newSortOrder: string) { 
    this.selectedSortOrder2 = newSortOrder;
    this.etatProduit2=true;
  }

  onFileSelected(event){
   
    this.selectedFile = <File>event.target.files[0];
    if( event.target.files.length > 0) {
      this.etatChangeblModif=true;
      this.ok=<File>event.target.files[0].name;
    this.validationbl =true;}
    else {
      this.validationbl =false;
    }
  }
  onFileSelected1(event){
   
    this.selectedFile1 = <File>event.target.files[0];
    if( event.target.files.length > 0) {
      this.etatChangefacModif=true;
      this.ok2=<File>event.target.files[0].name;
    this.validationbl1 =true;}
    else {
      this.validationbl1 =false;
    }
  }
  ClientDispo(searchValue: string) {  
    let formData4 = new FormData();
  
    formData4.append('codeClient', searchValue);
    this.auth.getCl(formData4)
    
    .subscribe((data1) => {
      console.log(data1);

      if(data1['message']=="ok"){
        console.log(data1['message']);
        this.auth.ClientModel.clientName=data1['client'];
        this.auth.ClientModel.region=data1['region'];
      }else{
        this.auth.ClientModel.clientName='';
        this.auth.ClientModel.region='';
      
     
      }
      }, 
      error => this.error = error 
    );
  }
  ajouterClient(){
    if(this.model.day<10){
      this.dayform='0'+this.model.day;
    }else {
      this.dayform=this.model.day;
    }
   if(this.model.month<10){
   this.monthform='0'+this.model.month;
  }else {
    this.monthform=this.model.month;
  }
    this.dateClient=this.model.year+'/'+this.monthform+'/'+this.dayform;
    console.log( this.model.month);
    if(this.nblAct){
     
      let formData33 = new FormData();
  
      formData33.append('dateC', this.dateClient);
      formData33.append('nBl', this.auth.ClientModel.nBl);
      formData33.append('nFac', this.auth.ClientModel.nFac);
      formData33.append('codeClient', this.auth.ClientModel.codeClient);
      formData33.append('client', this.auth.ClientModel.clientName);
      formData33.append('region', this.auth.ClientModel.region);
      formData33.append('modeReg', this.selectedSortOrder2);
      formData33.append('produit', this.selectedSortOrder);
      formData33.append('quantite', this.auth.ClientModel.quantite);
      formData33.append('totReg', this.selectedSortOrder1);
      formData33.append('montant', this.auth.ClientModel.montant);
      if(this.etatChangeblModif){
        
      formData33.append('fichierBl', this.selectedFile,this.selectedFile.name);
      formData33.append('check1bl',"1");
    }
      else {
        formData33.append('check1bl',"");
      }
      if(this.etatChangefacModif){
      formData33.append('fichierFac', this.selectedFile1,this.selectedFile1.name);
      formData33.append('check1Fac',"1");
    }else {
       
        formData33.append('check1Fac',"");
      }
        this.auth.updateClient(formData33)
    
        .subscribe((data1) => {
          console.log(data1);
    
          if(data1['message']=="updateokkk"){
            console.log(data1['message']);
            this.router.navigate(['clients']);
          }else{
           
            this.toastr.error('Erreur', 'Bon de livraison ou facture pas  disponible', {
              timeOut: 3000
            });
         
          }
          }, 
          error => this.error = error 
        );
      }
   
    
    else{
   
      let formData3 = new FormData();
  
      formData3.append('dateC', this.dateClient);
      formData3.append('nBl', this.auth.ClientModel.nBl);
      formData3.append('nFac', this.auth.ClientModel.nFac);
      formData3.append('codeClient', this.auth.ClientModel.codeClient);
      formData3.append('client', this.auth.ClientModel.clientName);
      formData3.append('region', this.auth.ClientModel.region);
      formData3.append('modeReg', this.selectedSortOrder2);
      formData3.append('produit', this.selectedSortOrder);
      formData3.append('quantite', this.auth.ClientModel.quantite);
      formData3.append('totReg', this.selectedSortOrder1);
      formData3.append('montant', this.auth.ClientModel.montant);
      formData3.append('fichierBl', this.selectedFile,this.selectedFile.name);
      formData3.append('fichierFac', this.selectedFile1,this.selectedFile1.name);
        this.auth.ajouterCl(formData3)
    
        .subscribe((data) => {
          console.log(data);
    
          if(data['message']=="updateokkk"){
            console.log(data['message']);
            this.router.navigate(['clients']);
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