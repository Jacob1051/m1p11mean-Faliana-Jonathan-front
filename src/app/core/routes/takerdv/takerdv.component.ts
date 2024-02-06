import { Component } from '@angular/core';
import { Employe } from 'src/app/_models/employe';
import { Service } from 'src/app/_models/service';
import { ServiceService } from '../../services/service/service.service';

@Component({
  selector: 'app-takerdv',
  standalone: true,
  imports: [],
  templateUrl: './takerdv.component.html',
  styleUrl: './takerdv.component.scss'
})
export class TakerdvComponent {

  constructor(
    private serviceService: ServiceService,
  ) { }

  listeService: Service[] = [];
  listeEmploye: Employe[] = [];
  listeEmployeDispo: Employe[] = [];

}
