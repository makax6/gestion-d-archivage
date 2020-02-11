import { Component, OnInit } from '@angular/core';
import { Router  } from '@angular/router';
import { AuthOrdreService } from '../../auth-ordre.service';
import { ToastrService } from 'ngx-toastr';
import {Mission} from '../../models/mission.intr';
@Component({
  selector: 'app-icons',
  templateUrl: './icons.component.html',
  styleUrls: ['./icons.component.scss']
})
export class IconsComponent implements OnInit {
  error;
  ordreMissionIn : Mission[];
  public copy: string;
  dateform1;
  dateform2;
  date2;
  date1;
  dayform1:string;
  dayform2:string;
  monthform1:string;
  monthform2:string;
  constructor(private router: Router,private auth:AuthOrdreService,private toastr: ToastrService) { }
 
  ngOnInit() {
    this.auth.getAll()
    
    .subscribe((data:Mission[]) => {
  
      if(data['message']=="no"){
    
        this.ordreMissionIn = [];
      }else  {
      this.ordreMissionIn = data;
      console.log(this.ordreMissionIn);
      }
      
    });
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
    if(this.date1&&this.date2){
      let formData3 = new FormData();
  
      formData3.append('date1', this.dateform1);
      formData3.append('date2', this.dateform2);
      this.auth.getFilter(formData3)
    
      .subscribe((data:Mission[]) => {
       
        if(data['message']=="no"){
          this.toastr.warning('Veuillez vérifier vos filtres !');
          console.log(data['message']);
          this.ordreMissionIn = [];
        }else{
          this.ordreMissionIn = data;
          console.log(this.ordreMissionIn);
    }
      });
    }
  
  }

  ajouter(){

    this.router.navigate(['ajouter-Ordre-de-Mission']);
  }
  delete(idFs:string){
    let formData4 = new FormData();
  
    formData4.append('id', idFs);
   
    this.auth.deleteOrdre(formData4)
    .subscribe((data:Mission[]) =>{
      console.log(data);
      if(data['message']=="no"){
        this.toastr.error('Erreur', 'Erreur', {
          timeOut: 3000
        });
      }
      else if(data['message']=="ER"){
        this.ordreMissionIn = [];
        this.toastr.warning('Suppression success!');
     
      }
else {
  this.ordreMissionIn = data;
  console.log(this.ordreMissionIn);
  this.toastr.warning('Suppression success!');
}
  
}, 
);
  }

  modifier(idFs:string){

    this.router.navigate(['/ajouter-Ordre-de-Mission'],{ queryParams: { idOM: idFs} });

  }
  view(idFs:string){
    this.router.navigate(['/ordreSolo'],{ queryParams: { idOM: idFs} });

  }
}