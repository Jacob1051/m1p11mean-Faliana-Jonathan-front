import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerComponent } from './manager.component';


@NgModule({
    declarations: [
        ManagerComponent
    ],
    imports: [
        CommonModule,
        ManagerRoutingModule
    ],
    // exports: [ManagerComponent],
    // bootstrap: [ManagerComponent]
})
export class ManagerModule { }
