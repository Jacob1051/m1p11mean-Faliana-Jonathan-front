import { ServiceService } from '../../services/service/service.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent{

  searchText: string = '';
  allServices;
  services;

  constructor(service: ServiceService){
    this.allServices = service.getAllServices();
    this.services = this.allServices;
  }

  searchInsideService(){
    if(this.searchText){
      this.services = this.allServices.filter((service) => (service.name.toLowerCase().includes(this.searchText.toLowerCase())));
    }else{
      this.services = this.allServices;
    }
  }
}
