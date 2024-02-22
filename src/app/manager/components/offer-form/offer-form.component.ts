import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as moment from 'moment';
import { Item } from 'src/app/shared/models/multi-dropdown';

@Component({
  selector: 'app-offer-form',
  templateUrl: './offer-form.component.html',
  styleUrl: './offer-form.component.scss'
})
export class OfferFormComponent implements OnInit{

    offerForm!: FormGroup;
    listeService!: Item[];
    offreData!: any;

    @Output() itemChange = new EventEmitter<any>(undefined);

    @Input() buttonLabel = '';

    @Input('offreData')
    set offreDatas(offre: any){
        this.offreData = offre;
    }

    @Input('listeService')
    set listeServices(liste: Item[]){
        this.listeService = liste;
    }

    @Input('offreData')
    set offerFormData(data: any){
        this.offreData = data;


    }

    get formControl() {return this.offerForm.controls;}

    onItemServiceChange(service: Item): void {
        this.offerForm.patchValue({'service': service.id})
    }

    submitted = false;
    loading = false;

    ngOnInit(): void {

        this.offerForm = new FormGroup(
            {
                nomOffre: new FormControl<string>('', [Validators.required]),
                service: new FormControl<string>("", [Validators.required]),
                remise: new FormControl<number>(10, [Validators.required]),
                dateDebut: new FormControl(moment().format('YYYY-MM-DD HH:mm'), { validators: [Validators.required] }),
                dateFin: new FormControl(moment().add(1, 'day').format('YYYY-MM-DD HH:mm'), { validators: [Validators.required] }),
            }
        );

        if(this.offreData){
            this.offerForm.patchValue({'nomOffre': this.offreData.nomOffre});
            this.offerForm.patchValue({'remise': this.offreData.remise});
            this.offerForm.patchValue({'dateDebut': moment(this.offreData.dateDebut).format('YYYY-MM-DD HH:mm')});
            this.offerForm.patchValue({'dateFin': moment(this.offreData.dateFin).format('YYYY-MM-DD HH:mm')});
        }
    }

    submit() {
        if(this.offerForm.valid)
            this.itemChange.emit(this.offerForm.value);
    }
}
