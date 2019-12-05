export class Products {
    cityId: number;
    id: number;
    image: string;
    minimumAmountToOrder: number;
    name: string;
    nameAr: string;
    nameEn: string;
    price: number;
    package: {
        id: number,
        name: string
    }
    packageSize: {
        id: number,
        name: string
    };


}