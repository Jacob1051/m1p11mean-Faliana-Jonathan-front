import { Employee } from "./employee";
import { Service } from "./service";
import { Statut } from "./statut";

export interface Tache {
  dateDebut: Date;
  dateFin: Date;
  employe: Employee;
  service: Service;
  statut: Statut;
  isDeleted: boolean;
}
