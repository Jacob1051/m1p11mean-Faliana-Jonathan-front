export interface Item {
    uuid?: string;
    id: number | string | null;
    name: string;
    checked?: boolean;
    visible?: boolean;
    data?: any;
}
