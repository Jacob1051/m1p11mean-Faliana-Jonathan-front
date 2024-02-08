export interface Service {
    _id: string;
    nomService: string;
    prix: number;
    duree: number;
    commission: number;
    description: string;
    image: string;
    icone: string;
    galerie: [];
    isDeleted: boolean;
}
