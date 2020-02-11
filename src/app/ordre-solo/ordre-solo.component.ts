import { Component, OnInit } from '@angular/core';
import * as jsPDF from 'jspdf';
import { Router ,ActivatedRoute } from '@angular/router';
import { AuthOrdreService } from '../auth-ordre.service';
import 'jspdf-autotable';
import {ttOrdre} from '../models/ttOrdre.inter';
@Component({
  selector: 'app-ordre-solo',
  templateUrl: './ordre-solo.component.html',
  styleUrls: ['./ordre-solo.component.scss']
})
export class OrdreSoloComponent implements OnInit {
  doc;
  error;
  id;
  tTOrdre : ttOrdre[];
  idOrdre;
  constructor(private router: Router, private route: ActivatedRoute,private auth:AuthOrdreService) {

    this.id = this.route.queryParams.subscribe(params => {
      // Defaults to 0 if no query param provided.
      this.idOrdre = params['idOM'] ;
  
      
      
    });
   }

  ngOnInit() {
    if(this.idOrdre){
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
      let formData1 = new FormData();
      formData1.append('idOrdre', this.idOrdre);
      this.auth.getcl2(formData1)
     
      .subscribe((data:ttOrdre[]) => {
      
    
  
        if(data['message']!=="no"){
          this.tTOrdre = data;
          console.log(this.tTOrdre);
          for (let entry of this.tTOrdre) {
                 this.auth.OrdrerModel.monsieur=entry.monsieur;
                 this.auth.OrdrerModel.designation=entry.designation;
                 this.auth.OrdrerModel.dateS=entry.dateS;
                 this.auth.OrdrerModel.dateR=entry.dateR;
                 this.auth.OrdrerModel.heureS=entry.heureS;
                 this.auth.OrdrerModel.heureR=entry.heureR;
                 this.auth.OrdrerModel.chargementS=entry.chargementS;
                 this.auth.OrdrerModel.chargementR=entry.chargementR;
          }
   
    }

        else{
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
       
      
        if(data1['message']!=="no"){
          this.tTOrdre = data1;
    
        
    }
  else{
    this.router.navigate(['login']);
    console.log(data1['message']);
 
  }
  }, 
  error => this.error = error 
);


  }else {
    this.router.navigate(['login']);
  }
}
  public generatePDF() 
 { 
  
  this.doc = new jsPDF('landscape', 'pt', 'a4');

  this.doc.autoTable({

    html: '#my-table1',
    useCss: true,
   
   
 
    
  
   
  });


  this.doc.save('table.pdf');
}
}
