import { Service } from "./service";
import { User } from "./user";

export interface Employe {
    _id: string;
    nomEmploye: string;
    prenomEmploye: string;
    user: User;
    image: string;
    mesServices: [Service];
    isDeleted: boolean;
}
