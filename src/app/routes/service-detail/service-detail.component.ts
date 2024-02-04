import { Component } from '@angular/core';

@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.component.html',
  styleUrls: ['./service-detail.component.scss']
})
export class ServiceDetailComponent {
  ngOnInit() {

    const scriptCode = `BeautyZone.handleMasonryFilter();`;
    // Utilisation de eval() pour exécuter le code
    eval(scriptCode);
    
  }
}
