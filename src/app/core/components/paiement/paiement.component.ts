import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import Scrollbar from "smooth-scrollbar";

@Component({
    selector: 'app-paiement',
    templateUrl: './paiement.component.html',
    styleUrl: './paiement.component.scss',
})
export class PaiementComponent {
    listeTache: any = [];

    submitted:boolean = false;

    @Input('listeTache')
    set listeTaches(tache: any[]) {
        this.listeTache = tache;
    }

    @Input() total = 0;
    @Input() paiementForm!: FormGroup;
    @Output() formSubmitted = new EventEmitter<void>();

    ngOnInit() {
        Scrollbar.init((<any>document.querySelector(".modalPaiement")));
    }

    get formControl() { return this.paiementForm.controls; }

    onSubmit() {
        this.submitted = true;

        if(this.paiementForm.valid){
            this.formSubmitted.emit();
        }
    }
}
