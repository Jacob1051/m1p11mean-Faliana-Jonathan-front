import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent {
  services = [
    {
      icon: 'flaticon-barbershop',
      name: 'Coiffure & stylisme',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
    },{
      icon: 'flaticon-makeup',
      name: 'Makeup',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
    },{
      icon: 'flaticon-makeup-1',
      name: 'Manicure & Pedicure',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
    },{
      icon: 'flaticon-woman-1',
      name: 'Soins de la peau',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
    },{
      icon: 'flaticon-woman',
      name: 'Traitement du corps',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
    },{
      icon: 'flaticon-candle-1',
      name:'Massage',
      description: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry'
    }
  ]
}
