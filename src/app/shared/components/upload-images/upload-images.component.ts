import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../../core/services/file-upload/file-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-upload-images',
    templateUrl: './upload-images.component.html',
    styleUrl: './upload-images.component.scss'
})
export class UploadImagesComponent implements OnInit {

    @Input() formData: any;
    @Input() multiple: boolean = false;
    @Input() formField: string = '';

    selectedFiles?: FileList|null;

    previews: string[] = [];
    imageInfos?: Observable<any>;

    ngOnInit(): void {
        this.imageInfos = this.uploadService.getFiles();
    }


    selectFiles(event: any): void {
        this.selectedFiles = (event.target as HTMLInputElement).files;

        this.previews = [];
        if (this.selectedFiles && this.selectedFiles[0]) {
            const numberOfFiles = this.selectedFiles.length;
            this.formData.patchValue({[this.formField]: (event.target as HTMLInputElement).files});
            this.formData.get(this.formField).updateValueAndValidity();

            for (let i = 0; i < numberOfFiles; i++) {
                const reader = new FileReader();

                reader.onload = (e: any) => {
                    this.previews.push(e.target.result);
                };

                reader.readAsDataURL(this.selectedFiles[i]);
            }
        }
    }

    constructor(private uploadService: FileUploadService) { }
}
