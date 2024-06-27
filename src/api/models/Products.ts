export interface IProduct {
   id: string;
   personId: string;
   moderated: boolean;
   type: TProductType;
   isNew: boolean;
   from: string;
   exchange: boolean;
   trade: boolean;
   owner: TOwner;
   name: string;
   description: string;
   brand: string;
   body: string;
   color: string;
   coloring: string;
   model: string;
   price: number;
   year: number;
   millage: number;
   generation: string;
   gear: TGear;
   fuel: TFuel;
   driveUnit: TDriveUnit;
   createdAt: Date;
   photoId: number | null;
}

export type IPostProductRequest = Omit<
   IProduct,
   'id' | 'personId' | 'photoId' | 'createAt' | 'id' | 'moderated'
>;

export interface ISearchProductsRequest {
   page: number | null;
   size: number | null;
   sortBy: TSorting | null;
   reverse: boolean | null;
   name: string | null;
   type: TProductType | null;
   isNew: boolean | null;
   brand: TBrand | null;
   body: TBody | null;
   color: TColor | null;
   coloring: TColoring | null;
   model: string | null;
   owner: TOwner | null;
   priceFrom: number | null;
   priceTo: number | null;

   yearFrom: number | null;
   yearTo: number | null;

   millageFrom: number | null;
   millageTo: number | null;

   from: string | null;
   exchange: boolean | null;
   trade: boolean | null;
   generation: string | null;
   gear: TGear | null;
   fuel: TFuel | null;
   driveUnit: TDriveUnit | null;
}

export interface ISelectItem<T> {
   value: T;
   label: string;
}

export type TColoring = 'MATTE' | 'GLOSSY' | 'METALLIC' | 'NACRE';

export type TOwner = 'OWNER' | 'PRIVATE_OWNER' | 'COMPANY' | 'OTHER';

export type TProductType =
   | 'AUTOMOBILE'
   | 'DETAILS'
   | 'CONSUMABLES'
   | 'MOTORCYCLE'
   | 'SPECIAL_EQUIPMENTS';
export type TDriveUnit = 'FWD' | 'RWD' | 'ALL' | 'CONTROLLED_ALL' | 'OTHER';

export type TFuel =
   | 'GASOLINE'
   | 'DIESEL'
   | 'BIODIESEL'
   | 'PROPANE'
   | 'METHANE'
   | 'ELECTRIC'
   | 'OTHER';

export type TGear = 'MANUAL' | 'AUTOMATIC' | 'ROBOTIC' | 'CTV' | 'OTHER';

export type TSorting = 'createdAt';

export interface IBrand {
   name: string;
   img: string;
   id: number;
}

// export interface IModel {
//    name: string;
//    img: string;
//    id: number;
//    brandId: number;
// }

export type TColor =
   | 'BLACK'
   | 'WHITE'
   | 'RED'
   | 'GREEN'
   | 'BLUE'
   | 'CYAN'
   | 'BROWN'
   | 'PURPLE'
   | 'PINK'
   | 'YELLOW'
   | 'ORANGE'
   | 'GRAY'
   | 'GRADIENT'
   | 'OTHER';

export type TBrand =
   | 'Acura'
   | 'AITO'
   | 'Alfa Romeo'
   | 'Alga'
   | 'Alpina'
   | 'Arcfox'
   | 'Aro'
   | 'Aston Martin'
   | 'Audi'
   | 'Aurus'
   | 'Avatr'
   | 'BAIC'
   | 'Bajaj'
   | 'Baojun'
   | 'BAW'
   | 'Bentley'
   | 'Blaval'
   | 'BMW'
   | 'Borgward'
   | 'Brilliance'
   | 'Bugatti'
   | 'Buick'
   | 'BYD'
   | 'Cadillac'
   | 'Changan'
   | 'ChangFeng'
   | 'Changhe'
   | 'Chery'
   | 'Chevrolet'
   | 'Chrysler'
   | 'Citroen'
   | 'Core Power'
   | 'Dacia'
   | 'Daewoo'
   | 'Daihatsu'
   | 'Datsun'
   | 'Dayun'
   | 'Denza'
   | 'Derways'
   | 'DFSK'
   | 'Dodge'
   | 'DongFeng'
   | 'DS'
   | 'Eagle'
   | 'Enovate'
   | 'Evergrande'
   | 'EXEED'
   | 'Fang Cheng Bao'
   | 'Farizon'
   | 'FAW'
   | 'Ferrari'
   | 'Fiat'
   | 'Fisker'
   | 'Ford'
   | 'Forthing'
   | 'Foton'
   | 'GAC'
   | 'Geely'
   | 'Genesis'
   | 'GMC'
   | 'Gonow'
   | 'Great Wall'
   | 'Hafei'
   | 'Haima'
   | 'Hanteng'
   | 'Haval'
   | 'Hawtai'
   | 'HiPhi'
   | 'Honda'
   | 'Hongqi'
   | 'Hozon'
   | 'HuangHai'
   | 'Hummer'
   | 'Hyundai'
   | 'iCar'
   | 'IM'
   | 'Infiniti'
   | 'Iran Khodro'
   | 'Isuzu'
   | 'JAC'
   | 'Jaecoo'
   | 'Jaguar'
   | 'Jeep'
   | 'Jetour'
   | 'Jetta'
   | 'JinBei'
   | 'JINPENG'
   | 'Jiyue'
   | 'JMC'
   | 'Kaiyi'
   | 'Karry'
   | 'Kia'
   | 'KYC'
   | 'Lamborghini'
   | 'Lancia'
   | 'Land Rover'
   | 'Leapmotor'
   | 'Leopaard'
   | 'Lexus'
   | 'Li'
   | 'Lifan'
   | 'Lincoln'
   | 'Livan'
   | 'Lotus'
   | 'Lucid'
   | 'Luxgen'
   | 'Lynk & Co'
   | 'Mahindra'
   | 'Maple'
   | 'Maserati'
   | 'Maxus'
   | 'Maybach'
   | 'Mazda'
   | 'McLaren'
   | 'Mercedes-Benz'
   | 'Mercedes-Maybach'
   | 'Mercury'
   | 'Metrocab'
   | 'MG'
   | 'Mini'
   | 'Mitsubishi'
   | 'Nio'
   | 'Nissan'
   | 'NL'
   | 'Oldsmobile'
   | 'OMODA'
   | 'Opel'
   | 'Ora'
   | 'Peugeot'
   | 'Plymouth'
   | 'Polar Stone'
   | 'Polestar'
   | 'Pontiac'
   | 'Porsche'
   | 'Proton'
   | 'Puch'
   | 'Radar'
   | 'Ravon'
   | 'Renault'
   | 'Renault Samsung'
   | 'Rivian'
   | 'Roewe'
   | 'Rolls-Royce'
   | 'Rover'
   | 'Saab'
   | 'SAIC'
   | 'Santana'
   | 'Saturn'
   | 'Scion'
   | 'SEAT'
   | 'Seres'
   | 'ShuangHuan'
   | 'Skoda'
   | 'Skywell'
   | 'Smart'
   | 'Sol'
   | 'Soueast'
   | 'SRM'
   | 'SsangYong'
   | 'Subaru'
   | 'Suzuki'
   | 'SWM'
   | 'Tank'
   | 'Tesla'
   | 'Tianma'
   | 'Tianye'
   | 'Toyota'
   | 'Venucia'
   | 'VGV'
   | 'VinFast'
   | 'Volkswagen'
   | 'Volvo'
   | 'Vortex'
   | 'Voyah'
   | 'Wanfeng'
   | 'Weltmeister'
   | 'Wey'
   | 'Wuling'
   | 'Xiaomi'
   | 'Xinkai'
   | 'Xpeng'
   | 'Yema'
   | 'Zeekr'
   | 'Zhiji'
   | 'Zotye'
   | 'ZX'
   | 'ВАЗ (Lada)'
   | 'ВИС'
   | 'ГАЗ'
   | 'ЕрАЗ'
   | 'ЗАЗ'
   | 'ЗИЛ'
   | 'ИЖ'
   | 'ЛуАЗ'
   | 'Москвич'
   | 'РАФ'
   | 'Ретро-автомобили'
   | 'СМЗ'
   | 'ТагАЗ'
   | 'УАЗ';

export type TBody =
   | 'coupe'
   | 'universal'
   | 'hatchback'
   | 'roadster'
   | 'liftback'
   | 'crossover'
   | 'sedan'
   | 'offroad'
   | 'compact'
   | 'cabriolet';
