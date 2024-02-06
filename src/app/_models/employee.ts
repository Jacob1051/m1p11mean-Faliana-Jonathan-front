import { Service } from "./service";
import { User } from "./user";

export interface Employee {
    _id: string;
    nomEmploye: string;
    prenomEmploye: string;
    user: User;
    image: string;
    mesServices: [Service];
    isDeleted: boolean;
}
