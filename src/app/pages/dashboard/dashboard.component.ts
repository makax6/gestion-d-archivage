import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { Router  } from '@angular/router';
import { AuthClientService } from '../../auth-client.service';
import {ClientInt} from '../../models/client.interf';
import * as jsPDF from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas';
// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  doc;
  month=['JAN', 'FÉV', 'MAR', 'AVR', 'MAI', 'JUN', 'JUL', 'AOÛ', 'SEP', 'OCT', 'NOV', 'DÉC'];
  year=[2019, 2018, 2017, 2016, 2015];
  etatTextNewCl:boolean=false;
  etatCl:boolean=false;
  etatTextNewCl1:boolean=false;
  etatTextNewCl2:boolean=false;
  nbCl;
  newcl;
momcl;
mt;
qt;
momMt;

momQt;
chartOrders;
chartSales
  public datasets1: any;
  public datasets: any;
  public data: any;
  public salesChart;
  public ordersChart;
  public salesChart1;
  public ordersChart1;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  emailCO = localStorage.getItem('emailCO');
  constructor(private router: Router,private auth:AuthClientService) { }

  ngOnInit() {

    if(!this.emailCO){
      console.log(this.emailCO!);
      this.router.navigate(['login']);

    } 
    this.chartOrders = document.getElementById('chart-orders');
    this.chartSales = document.getElementById('chart-sales');
    this.getMonth();

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






getMonth(){
  if(this.etatCl){
  this.salesChart1.destroy();
  this.ordersChart1.destroy();}
  this.auth.getCbMtQtMonth()
    
  .subscribe((data2) => {
  
    parseOptions(Chart, chartOptions());


     this.ordersChart = new Chart(this.chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });
   

    this.salesChart = new Chart(this.chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });
   this.datasets1=data2;
   this.salesChart.data.datasets[0].data = this.datasets1[0];
   this.salesChart.data.labels=this.month;
   this.salesChart.update();


   this.ordersChart.data.datasets[0].data = this.datasets1[1];
   this.ordersChart.data.labels=this.month;
   this.ordersChart.update();
  
  });
}
getYear(){
  this.etatCl=true;
  this.salesChart.destroy();
  this.ordersChart.destroy();
  this.auth.getCbMtQt5y()
    
  .subscribe((data2) => {
   
    
    parseOptions(Chart, chartOptions());

     this.ordersChart1 = new Chart(this.chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });
   

    this.salesChart1 = new Chart(this.chartSales, {
      type: 'line',
      options: chartExample1.options,
      data: chartExample1.data
    });
   this.datasets1=data2;
   this.salesChart1.data.datasets[0].data = this.datasets1[0];
   this.salesChart1.data.labels=this.datasets1[2];
   this.salesChart1.update();


   this.ordersChart1.data.datasets[0].data = this.datasets1[1];
   this.ordersChart1.data.labels=this.datasets1[2];
   this.ordersChart1.update();
  
  });              
  
  
}



}