import { Component } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    styleUrl: './layout.component.scss',
})
export class LayoutComponent {
    ngOnInit() {
        Scrollbar.init(<any>document.querySelector('body'));
    }
}
