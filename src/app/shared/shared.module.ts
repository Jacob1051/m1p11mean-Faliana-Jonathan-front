import { CommonModule } from '@angular/common';
import { MultiDropdownComponent } from './components/multi-dropdown/multi-dropdown.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownComponent } from './components/dropdown/dropdown.component';
import { UploadImagesComponent } from './components/upload-images/upload-images.component';

@NgModule({
    declarations: [
        MultiDropdownComponent,
        DropdownComponent,
        UploadImagesComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports: [
        MultiDropdownComponent,
        DropdownComponent,
        UploadImagesComponent
    ]
})
export class SharedModule { }
