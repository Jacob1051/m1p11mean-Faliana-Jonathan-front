import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
    selector: 'app-paiement',
    templateUrl: './paiement.component.html',
    styleUrl: './paiement.component.scss',
})
export class PaiementComponent {
    listeTache: any = [];

    @Input('listeTache')
    set listeTaches(tache: any[]) {
        this.listeTache = tache;
    }

    @Input() total = 0;
    @Input() paiementForm!: FormGroup;
    @Output() formSubmitted = new EventEmitter<void>();

    onSubmit() {
        this.formSubmitted.emit();
    }
}
