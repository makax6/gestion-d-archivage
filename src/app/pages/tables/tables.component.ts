import { Component, OnInit, ElementRef ,ViewChild } from '@angular/core';
import { Router  } from '@angular/router';
import { AuthClientService } from '../../auth-client.service';
import {ClientInt} from '../../models/client.interf';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';

import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss']
})
export class TablesComponent implements OnInit {
  etatProduit:boolean=false;
  etatTextNewCl:boolean=false;
  etatTextNewCl1:boolean=false;
  etatTextNewCl2:boolean=false;

  newcl;
momcl;
mt;
qt;
momMt;
momQt;
   doc;
   z;
   y;
prix=0;
dateform1;
date1;
dayform1:string;
nbCl;
monthform1:string;
dateform2;
date2;
date3;
date4;
dayform2:string;
monthform2:string;
qquantiteTot=0;
  rememberFac:boolean=true;
  rememberBl:boolean=true;
  clients : ClientInt[];
  sortOrders3: string[] = ["Date", "Code Client", "Règlement"];
  
  selectedSortOrder3: string = "Recherche par:";
  error;
  constructor(private router: Router,private auth:AuthClientService,private toastr: ToastrService) { 
  
  }

  ngOnInit() {

    this.auth.getAll()
    
      .subscribe((data:ClientInt[]) => {
    
      
        this.clients = data;
        console.log(this.clients);
        for (let entry of this.clients) {
     this.z = +entry.quantite;
     this.y =  +entry.montant;
          this.qquantiteTot += this.z;
          this.prix += this.y;
          console.log(this.prix );
          console.log(this.qquantiteTot );
        }
      });
      this.auth.getNbCl()
    
      .subscribe((data2) => {
        console.log(data2);
        this.nbCl=data2;
        
      });
      this.auth.getNEWCl()
    
      .subscribe((data2) => {
        console.log(data2);
        this.newcl=data2['newUser'];
        
        this.momcl=data2['momG'];
        if(this.momcl<0){
          this.etatTextNewCl=true;
        }else {
          this.etatTextNewCl=false;
        }
      });
      this.auth.getMtQtMom()
    
      .subscribe((data2) => {
        console.log(data2);
        this.mt=data2['mtTot'];
        
        this.qt=data2['qntTot'];
        this.momMt=data2['momgmt'];
        
        this.momQt=data2['momgqT'];
        if(this.momMt<0){
          this.etatTextNewCl1=true;
        }else {
          this.etatTextNewCl1=false;
        }
        if(this.momQt<0){
          this.etatTextNewCl2=true;
        }else {
          this.etatTextNewCl2=false;
        }
      });
 
}
  ajouter(){

    this.router.navigate(['ajouterClient']);
  }
  ChangeSortOrder3(newSortOrder: string) { 
    this.selectedSortOrder3 = newSortOrder;
    this.etatProduit=true;
  }
  open(url:string){
    window.open('http://localhost/friga/fichiers/bl/'+url);

  }
  open1(url:string){
    window.open('http://localhost/friga/fichiers/factures/'+url);

  }
  public generatePDF() 
 { 
  
  this.doc = new jsPDF('', 'pt', 'a4');

  this.doc.autoTable({

    html: '#my-table',
    headStyles:{
      fontStyle:'bold',

    },
   
    columnStyles: {
      0: {cellWidth: 48},
      1: {cellWidth: 45},
      2: {cellWidth: 45},
      3: {cellWidth: 45},
      4: {cellWidth: 45},
      5: {cellWidth: 45},
      6: {cellWidth: 45},
      7: {cellWidth: 45},
      8: {cellWidth: 45},
      9: {cellWidth: 'wrap'},
      10: {cellWidth: 45},
      11: {cellWidth: 45},
      12: {cellWidth: 45},
      13: {cellWidth: 45},
    
      // etc
    },
    styles:{
      lineWidth: 0.02,
      lineColor:  [0, 0, 0],
     
      fontStyle:'bold',
      fontSize: 8,
     
  },
  willDrawCell: (HookData) => {
    
   
    if ( HookData.row.section === 'body' &&   HookData.column.index ===8 ) {
      
      if(HookData.cell.text.indexOf('réglé') >-1 ){
      console.log(HookData.cell.raw);
  
        console.log(HookData.cell.raw);
        this.doc.setTextColor(76, 230, 60);
    }else if(HookData.cell.text.indexOf('non réglé') >-1 ){
      console.log(HookData.cell.raw);
  
        console.log(HookData.cell.raw);
        this.doc.setTextColor(231, 76, 60);
    }
  
  }
}
   
  });

  
  this.doc.save('table.pdf');
}
toggleFichierFac(event) {
  if ( event.target.checked ) {
      this.rememberFac = true;
    
 }else {
  this.rememberFac = false;

 }
}
toggleFichierBl(event1) {
  if ( event1.target.checked ) {
      this.rememberBl = true;
    
 }else {
  this.rememberBl = false;

 }
}
rechercherDate(){

  if(this.date1.day<10){
    this.dayform1='0'+this.date1.day;
  }else {
    this.dayform1=this.date1.day;
  }
 if(this.date1.month<10){
 this.monthform1='0'+this.date1.month;
}else {
  this.monthform1=this.date1.month;
}
this.dateform1=this.date1.year+'/'+this.monthform1+'/'+this.dayform1;     
if(this.date2.day<10){
  this.dayform2='0'+this.date2.day;
}else {
  this.dayform2=this.date2.day;
}
if(this.date2.month<10){
this.monthform2='0'+this.date2.month;
}else {
this.monthform2=this.date2.month;
}
this.dateform2=this.date2.year+'/'+this.monthform2+'/'+this.dayform2;
  if(this.selectedSortOrder3=="Date"&&this.date1&&this.date2){


  this.qquantiteTot=0;
  this.prix=0;
  let formData3 = new FormData();
  
      formData3.append('date1', this.dateform1);
      formData3.append('date2', this.dateform2);
      formData3.append('Check', "d");
      this.auth.getFilter(formData3)
    
      .subscribe((data:ClientInt[]) => {
       
        if(data['message']=="no"){
          this.toastr.warning('Veuillez vérifier vos filtres !');
          console.log(data['message']);
          this.clients = [];
        }else{
          this.clients = data;
          console.log(this.clients);
        for (let entry of this.clients) {
          this.z = +entry.quantite;
     this.y =  +entry.montant;
          this.qquantiteTot += this.z;
          this.prix += this.y;
          console.log(this.prix );
          console.log(this.qquantiteTot );
        }}
      });
    }else if(this.selectedSortOrder3=="Code Client"&&this.date1&&this.date2&&this.date3) {
      this.qquantiteTot=0;
      this.prix=0;
      let formData3 = new FormData();
      
          formData3.append('date1', this.dateform1);
          formData3.append('date2', this.dateform2);
          formData3.append('CodeClient', this.date3);
          formData3.append('Check', "c");
          this.auth.getFilter(formData3)
        
          .subscribe((data:ClientInt[]) => {
           
            if(data['message']=="no"){
              this.toastr.warning('Veuillez vérifier vos filtres !');
              console.log(data['message']);
              this.clients = [];
            }else{
              this.clients = data;
              console.log(this.clients);
            for (let entry of this.clients) {
              this.z = +entry.quantite;
         this.y =  +entry.montant;
              this.qquantiteTot += this.z;
              this.prix += this.y;
              console.log(this.prix );
              console.log(this.qquantiteTot );
            }}
          });
    }else if(this.selectedSortOrder3=="Règlement"&&this.date1&&this.date2&&this.date4) {
      this.qquantiteTot=0;
      this.prix=0;
      let formData3 = new FormData();
      
          formData3.append('date1', this.dateform1);
          formData3.append('date2', this.dateform2);
          formData3.append('totReg', this.date4);
          formData3.append('Check', "r");
          this.auth.getFilter(formData3)
        
          .subscribe((data:ClientInt[]) => {
           
            if(data['message']=="no"){
              this.toastr.warning('Veuillez vérifier vos filtres !');
              console.log(data['message']);
              this.clients = [];
            }else{
              this.clients = data;
              console.log(this.clients);
            for (let entry of this.clients) {
              this.z = +entry.quantite;
         this.y =  +entry.montant;
              this.qquantiteTot += this.z;
              this.prix += this.y;
              console.log(this.prix );
              console.log(this.qquantiteTot );
            }}
          });
        }

}
delete(deel:string,deel1:string,deel2:string){
  let formData4 = new FormData();
  
      formData4.append('del', deel);
      formData4.append('fichierBl', deel1);
      formData4.append('fichierFac', deel2);
      this.auth.deleteClient(formData4)
    
      .subscribe((data:ClientInt[]) =>{
        console.log(data);
        if(data['message']=="no"){
          this.toastr.error('Erreur', 'Erreur', {
            timeOut: 3000
          });
        }
        else if(data['message']=="ER"){
          this.clients = [];
          this.toastr.warning('Suppression success!');
          this.qquantiteTot=0;
          this.prix=0;
         this.qt=0;
         this.mt=0;
         this.momMt=0;
         this.momQt=0;
         this.momcl=0;
         this.newcl=0;
         this.nbCl=0;
        }
        else{
          this.auth.getNbCl()
    
      .subscribe((data2) => {
        console.log(data2);
        this.nbCl=data2;
        
      });
      this.auth.getNEWCl()
    
      .subscribe((data2) => {
        console.log(data2);
        this.newcl=data2['newUser'];
        
        this.momcl=data2['momG'];
        if(this.momcl<0){
          this.etatTextNewCl=true;
        }else {
          this.etatTextNewCl=false;
        }
      });
      this.auth.getMtQtMom()
    
      .subscribe((data2) => {
        console.log(data2);
        this.mt=data2['mtTot'];
        
        this.qt=data2['qntTot'];
        this.momMt=data2['momgmt'];
        
        this.momQt=data2['momgqT'];
        if(this.momMt<0){
          this.etatTextNewCl1=true;
        }else {
          this.etatTextNewCl1=false;
        }
        if(this.momQt<0){
          this.etatTextNewCl2=true;
        }else {
          this.etatTextNewCl2=false;
        }
      });
          this.qquantiteTot=0;
          this.prix=0;
          this.clients = data;
          console.log(this.clients);
          this.toastr.warning('Suppression success!');
        for (let entry of this.clients) {
          this.z = +entry.quantite;
     this.y =  +entry.montant;
          this.qquantiteTot += this.z;
          this.prix += this.y;
        
        }
       
        }
        }, 
    );
}
modifier(nblMod:string){
  this.router.navigate(['/ajouterClient'],{ queryParams: { nbl: nblMod} });

}
}