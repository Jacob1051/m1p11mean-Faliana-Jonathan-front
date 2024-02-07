import { Employe } from "./employe";
import { Service } from "./service";
import { Statut } from "./statut";

export interface Tache {
  dateDebut: Date;
  dateFin: Date;
  employe: Employe;
  service: Service;
  statut: Statut;
  isDeleted: boolean;
}

