import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-layout-manager',
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
})
export class LayoutComponent {
    constructor(private router: Router) {
    }

    ngOnInit() {
        // console.log(this.router.url);
        // if (this.router.url == "/manager") {
        //     this.router.navigateByUrl("/manager/login");
        // }
    }
}
