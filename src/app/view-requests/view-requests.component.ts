import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../util/data.service'
@Component({
  selector: 'app-view-requests',
  templateUrl: './view-requests.component.html',
  styleUrls: ['./view-requests.component.css']
})
export class ViewRequestsComponent implements OnInit {
  requests:any;
  message = "";
  isDonor = false;
  donorsCount = 0;
  constructor(private http:HttpClient, private data: DataService) { }



  ngOnInit() {
  //  this.donorsCount = JSON.parse(localStorage.getItem('post')).donors.length;
    if (JSON.parse(localStorage.getItem('userInfo')).type === "donor") {
      this.isDonor = true;
    }
    this.http.post("/api/getRequests",{username:JSON.parse(localStorage.getItem('userInfo')).username})
    .subscribe(res=>{
      this.requests = res;
      console.log('res',res)
      setTimeout(() => {
        if (this.requests.length === 0) {
          this.message = "there is no requests yet !"
        }
      }, 1000)

    },err=>{
      console.log(err);
    })
  }

  finalize(request){
    if(request.amount === 0){
      this.message= "Enter real amount"
      return;
    }
    if(request.approvals <= request.donors / 2){
      this.message="you don't have the permession"
      return;
    }
    this.message = "done"

  }

  approve(request) {
    this.http.post('/api/approve', request)
    .subscribe(res=> {
      window.location.reload()
    }, err=> {
      console.log(err)
    })
  }

}
