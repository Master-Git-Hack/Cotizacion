interface properties {
    [key: string]: string | number;
}
export interface StateProperties extends properties{
    quantity:number;
    concept:string;
    price:number;
    total:number;
}
