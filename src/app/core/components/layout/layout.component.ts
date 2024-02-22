import { Component } from '@angular/core';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
})
export class LayoutComponent {
    constructor() {}

    ngOnInit() {
        // Scrollbar.init(<any>document.querySelector('body'));
    }
}
