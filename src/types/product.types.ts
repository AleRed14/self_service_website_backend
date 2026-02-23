export interface IProduct {
    id?: number;
    name: string;
    image: string;
    category: string;
    price: number | string;
    active?: number;
}