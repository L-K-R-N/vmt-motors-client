
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TBrand, TColor, TBody, TDriveUnit, TFuel, TGear, TOwner, TProductType, ISelectItem, TSorting, TColoring } from '@/api/models/Products';

export interface IFilterState {
   brands: ISelectItem<TBrand>[];

   driveUnits: ISelectItem<TDriveUnit>[];
   fuels: ISelectItem<TFuel>[];
   gears: ISelectItem<TGear>[];
   colors: ISelectItem<TColor>[];
   types: ISelectItem<TProductType>[];
   owners: ISelectItem<TOwner>[];
   bodies: ISelectItem<TBody>[];
   sortByOptions: ISelectItem<TSorting>[];
   colorings: ISelectItem<TColoring>[];
}

const initialState: IFilterState = {
   brands: [
      {
         value: 'AITO',
         label: 'AITO',
      },
      {
         value: 'Alfa Romeo',
         label: 'Alfa Romeo',
      },
      {
         value: 'Alga',
         label: 'Alga',
      },
      {
         value: 'Alpina',
         label: 'Alpina',
      },
      {
         value: 'Arcfox',
         label: 'Arcfox',
      },
      {
         value: 'Aro',
         label: 'Aro',
      },
      {
         value: 'Aston Martin',
         label: 'Aston Martin',
      },
      {
         value: 'Audi',
         label: 'Audi',
      },
      {
         value: 'Aurus',
         label: 'Aurus',
      },
      {
         value: 'Avatr',
         label: 'Avatr',
      },

      {
         value: 'BAIC',
         label: 'BAIC',
      },
      {
         value: 'Bajaj',
         label: 'Bajaj',
      },
      {
         value: 'Baojun',
         label: 'Baojun',
      },
      {
         value: 'BAW',
         label: 'BAW',
      },
      {
         value: 'Bentley',
         label: 'Bentley',
      },
      {
         value: 'Blaval',
         label: 'Blaval',
      },
      {
         value: 'BMW',
         label: 'BMW',
      },
      {
         value: 'Borgward',
         label: 'Borgward',
      },
      {
         value: 'Brilliance',
         label: 'Brilliance',
      },
      {
         value: 'Bugatti',
         label: 'Bugatti',
      },
      {
         value: 'Buick',
         label: 'Buick',
      },
      {
         value: 'BYD',
         label: 'BYD',
      },

      {
         value: 'Cadillac',
         label: 'Cadillac',
      },
      {
         value: 'Changan',
         label: 'Changan',
      },
      {
         value: 'ChangFeng',
         label: 'ChangFeng',
      },
      {
         value: 'Changhe',
         label: 'Changhe',
      },
      {
         value: 'Chery',
         label: 'Chery',
      },
      {
         value: 'Chevrolet',
         label: 'Chevrolet',
      },
      {
         value: 'Chrysler',
         label: 'Chrysler',
      },
      {
         value: 'Citroen',
         label: 'Citroen',
      },
      {
         value: 'Core Power',
         label: 'Core Power',
      },

      {
         value: 'Dacia',
         label: 'Dacia',
      },
      {
         value: 'Daewoo',
         label: 'Daewoo',
      },
      {
         value: 'Daihatsu',
         label: 'Daihatsu',
      },
      {
         value: 'Datsun',
         label: 'Datsun',
      },
      {
         value: 'Dayun',
         label: 'Dayun',
      },
      {
         value: 'Denza',
         label: 'Denza',
      },
      {
         value: 'Derways',
         label: 'Derways',
      },
      {
         value: 'DFSK',
         label: 'DFSK',
      },
      {
         value: 'Dodge',
         label: 'Dodge',
      },
      {
         value: 'DongFeng',
         label: 'DongFeng',
      },
      {
         value: 'DS',
         label: 'DS',
      },

      {
         value: 'Eagle',
         label: 'Eagle',
      },
      {
         value: 'Enovate',
         label: 'Enovate',
      },
      {
         value: 'Evergrande',
         label: 'Evergrande',
      },
      {
         value: 'EXEED',
         label: 'EXEED',
      },

      {
         value: 'Fang Cheng Bao',
         label: 'Fang Cheng Bao',
      },
      {
         value: 'Farizon',
         label: 'Farizon',
      },
      {
         value: 'FAW',
         label: 'FAW',
      },
      {
         value: 'Ferrari',
         label: 'Ferrari',
      },
      {
         value: 'Fiat',
         label: 'Fiat',
      },
      {
         value: 'Fisker',
         label: 'Fisker',
      },
      {
         value: 'Ford',
         label: 'Ford',
      },
      {
         value: 'Forthing',
         label: 'Forthing',
      },
      {
         value: 'Foton',
         label: 'Foton',
      },

      {
         value: 'GAC',
         label: 'GAC',
      },
      {
         value: 'Geely',
         label: 'Geely',
      },
      {
         value: 'Genesis',
         label: 'Genesis',
      },
      {
         value: 'GMC',
         label: 'GMC',
      },
      {
         value: 'Gonow',
         label: 'Gonow',
      },
      {
         value: 'Great Wall',
         label: 'Great Wall',
      },

      {
         value: 'Hafei',
         label: 'Hafei',
      },
      {
         value: 'Haima',
         label: 'Haima',
      },
      {
         value: 'Hanteng',
         label: 'Hanteng',
      },
      {
         value: 'Haval',
         label: 'Haval',
      },
      { value: 'Hawtai', label: 'Hawtai' },
      {
         value: 'HiPhi',
         label: 'HiPhi',
      },
      {
         value: 'Honda',
         label: 'Honda',
      },
      {
         value: 'Hongqi',
         label: 'Hongqi',
      },
      {
         value: 'Hozon',
         label: 'Hozon',
      },
      {
         value: 'HuangHai',
         label: 'HuangHai',
      },
      {
         value: 'Hummer',
         label: 'Hummer',
      },
      {
         value: 'Hyundai',
         label: 'Hyundai',
      },

      {
         value: 'iCar',
         label: 'iCar',
      },
      {
         value: 'IM',
         label: 'IM',
      },
      {
         value: 'Infiniti',
         label: 'Infiniti',
      },
      {
         value: 'Iran Khodro',
         label: 'Iran Khodro',
      },
      {
         value: 'Isuzu',
         label: 'Isuzu',
      },

      {
         value: 'JAC',
         label: 'JAC',
      },
      {
         value: 'Jaecoo',
         label: 'Jaecoo',
      },
      {
         value: 'Jaguar',
         label: 'Jaguar',
      },
      {
         value: 'Jeep',
         label: 'Jeep',
      },
      {
         value: 'Jetour',
         label: 'Jetour',
      },
      {
         value: 'Jetta',
         label: 'Jetta',
      },
      {
         value: 'JinBei',
         label: 'JinBei',
      },
      {
         value: 'JINPENG',
         label: 'JINPENG',
      },
      {
         value: 'Jiyue',
         label: 'Jiyue',
      },
      {
         value: 'JMC',
         label: 'JMC',
      },

      {
         value: 'Kaiyi',
         label: 'Kaiyi',
      },
      {
         value: 'Karry',
         label: 'Karry',
      },
      {
         value: 'Kia',
         label: 'Kia',
      },
      {
         value: 'KYC',
         label: 'KYC',
      },

      {
         value: 'Lamborghini',
         label: 'Lamborghini',
      },
      {
         value: 'Lancia',
         label: 'Lancia',
      },
      {
         value: 'Land Rover',
         label: 'Land Rover',
      },
      {
         value: 'Leapmotor',
         label: 'Leapmotor',
      },
      {
         value: 'Leopaard',
         label: 'Leopaard',
      },
      {
         value: 'Lexus',
         label: 'Lexus',
      },
      {
         value: 'Li',
         label: 'Li',
      },
      {
         value: 'Lifan',
         label: 'Lifan',
      },
      {
         value: 'Lincoln',
         label: 'Lincoln',
      },
      {
         value: 'Livan',
         label: 'Livan',
      },
      {
         value: 'Lotus',
         label: 'Lotus',
      },
      {
         value: 'Lucid',
         label: 'Lucid',
      },
      {
         value: 'Luxgen',
         label: 'Luxgen',
      },
      {
         value: 'Lynk & Co',
         label: 'Lynk & Co',
      },

      {
         value: 'Mahindra',
         label: 'Mahindra',
      },
      {
         value: 'Maple',
         label: 'Maple',
      },
      {
         value: 'Maserati',
         label: 'Maserati',
      },
      {
         value: 'Maxus',
         label: 'Maxus',
      },
      {
         value: 'Maybach',
         label: 'Maybach',
      },
      {
         value: 'Mazda',
         label: 'Mazda',
      },
      {
         value: 'McLaren',
         label: 'McLaren',
      },
      {
         value: 'Mercedes-Benz',
         label: 'Mercedes-Benz',
      },
      {
         value: 'Mercedes-Maybach',
         label: 'Mercedes-Maybach',
      },
      {
         value: 'Mercury',
         label: 'Mercury',
      },
      {
         value: 'Metrocab',
         label: 'Metrocab',
      },
      {
         value: 'MG',
         label: 'MG',
      },
      {
         value: 'Mini',
         label: 'Mini',
      },
      {
         value: 'Mitsubishi',
         label: 'Mitsubishi',
      },

      {
         value: 'Nio',
         label: 'Nio',
      },
      {
         value: 'Nissan',
         label: 'Nissan',
      },
      {
         value: 'NL',
         label: 'NL',
      },

      {
         value: 'Oldsmobile',
         label: 'Oldsmobile',
      },
      {
         value: 'OMODA',
         label: 'OMODA',
      },
      {
         value: 'Opel',
         label: 'Opel',
      },
      {
         value: 'Ora',
         label: 'Ora',
      },

      {
         value: 'Peugeot',
         label: 'Peugeot',
      },
      {
         value: 'Plymouth',
         label: 'Plymouth',
      },
      {
         value: 'Polar Stone',
         label: 'Polar Stone',
      },
      {
         value: 'Polestar',
         label: 'Polestar',
      },
      {
         value: 'Pontiac',
         label: 'Pontiac',
      },
      {
         value: 'Porsche',
         label: 'Porsche',
      },
      {
         value: 'Proton',
         label: 'Proton',
      },
      {
         value: 'Puch',
         label: 'Puch',
      },

      {
         value: 'Radar',
         label: 'Radar',
      },
      {
         value: 'Ravon',
         label: 'Ravon',
      },
      {
         value: 'Renault',
         label: 'Renault',
      },
      {
         value: 'Renault Samsung',
         label: 'Renault Samsung',
      },
      {
         value: 'Rivian',
         label: 'Rivian',
      },
      {
         value: 'Roewe',
         label: 'Roewe',
      },
      {
         value: 'Rolls-Royce',
         label: 'Rolls-Royce',
      },
      {
         value: 'Rover',
         label: 'Rover',
      },

      {
         value: 'Saab',
         label: 'Saab',
      },
      {
         value: 'SAIC',
         label: 'SAIC',
      },
      {
         value: 'Santana',
         label: 'Santana',
      },
      {
         value: 'Saturn',
         label: 'Saturn',
      },
      {
         value: 'Scion',
         label: 'Scion',
      },
      {
         value: 'SEAT',
         label: 'SEAT',
      },
      {
         value: 'Seres',
         label: 'Seres',
      },
      {
         value: 'ShuangHuan',
         label: 'ShuangHuan',
      },
      {
         value: 'Skoda',
         label: 'Skoda',
      },
      {
         value: 'Skywell',
         label: 'Skywell',
      },
      {
         value: 'Smart',
         label: 'Smart',
      },
      {
         value: 'Sol',
         label: 'Sol',
      },
      {
         value: 'Soueast',
         label: 'Soueast',
      },
      { value: 'SRM', label: 'SRM' },
      { value: 'SsangYong', label: 'SsangYong' },
      { value: 'Subaru', label: 'Subaru' },
      { value: 'Suzuki', label: 'Suzuki' },
      { value: 'SWM', label: 'SWM' },
      { value: 'Tank', label: 'Tank' },
      { value: 'Tesla', label: 'Tesla' },
      { value: 'Tianma', label: 'Tianma' },
      { value: 'Tianye', label: 'Tianye' },
      { value: 'Toyota', label: 'Toyota' },
      { value: 'Venucia', label: 'Venucia' },
      { value: 'VGV', label: 'VGV' },
      { value: 'VinFast', label: 'VinFast' },
      { value: 'Volkswagen', label: 'Volkswagen' },
      { value: 'Volvo', label: 'Volvo' },
      { value: 'Vortex', label: 'Vortex' },
      { value: 'Voyah', label: 'Voyah' },
      { value: 'Wanfeng', label: 'Wanfeng' },
      { value: 'Weltmeister', label: 'Weltmeister' },
      { value: 'Wey', label: 'Wey' },
      { value: 'Wuling', label: 'Wuling' },
      { value: 'Xiaomi', label: 'Xiaomi' },
      { value: 'Xinkai', label: 'Xinkai' },
      { value: 'Xpeng', label: 'Xpeng' },
      { value: 'Yema', label: 'Yema' },
      { value: 'Zeekr', label: 'Zeekr' },
      { value: 'Zhiji', label: 'Zhiji' },
      { value: 'Zotye', label: 'Zotye' },
      { value: 'ZX', label: 'ZX' },
      { value: 'ВАЗ (Lada)', label: 'ВАЗ (Lada)' },
      { value: 'ВИС', label: 'ВИС' },
      { value: 'ГАЗ', label: 'ГАЗ' },
      { value: 'ЕрАЗ', label: 'ЕрАЗ' },
      { value: 'ЗАЗ', label: 'ЗАЗ' },
      { value: 'ЗИЛ', label: 'ЗИЛ' },
      { value: 'ИЖ', label: 'ИЖ' },
      { value: 'ЛуАЗ', label: 'ЛуАЗ' },
      { value: 'Москвич', label: 'Москвич' },
      { value: 'РАФ', label: 'РАФ' },
      { value: 'Ретро-автомобили', label: 'Ретро-автомобили' },
      { value: 'СМЗ', label: 'СМЗ' },
      { value: 'ТагАЗ', label: 'ТагАЗ' },
      { value: 'УАЗ', label: 'УАЗ' },
   ],

   driveUnits: [
      {
         value: 'ALL',
         label: 'Полный привод',
      },
      {
         value: 'FWD',
         label: 'Передний привод',
      },
      {
         value: 'RWD',
         label: 'Задний привод',
      },
      {
         value: 'OTHER',
         label: 'Другое',
      },
      {
         value: 'CONTROLLED_ALL',
         label: 'ХЗ ВООБЩЕ ЧТО ЭТО',
      },
   ],
   fuels: [
      {
         value: 'BIODIESEL',
         label: 'BIODIESEL',
      },
      {
         value: 'DIESEL',
         label: 'DIESEL',
      },
      {
         value: 'ELECTRIC',
         label: 'ELECTRIC',
      },
      {
         value: 'GASOLINE',
         label: 'GASOLINE',
      },
      {
         value: 'METHANE',
         label: 'METHANE',
      },
      {
         value: 'OTHER',
         label: 'OTHER',
      },
      {
         value: 'PROPANE',
         label: 'PROPANE',
      },
   ],
   gears: [
      {
         value: 'AUTOMATIC',
         label: 'AUTOMATIC',
      },
      {
         value: 'CTV',
         label: 'CTV',
      },
      {
         value: 'MANUAL',
         label: 'MANUAL',
      },
      {
         value: 'OTHER',
         label: 'OTHER',
      },
      {
         value: 'ROBOTIC',
         label: 'ROBOTIC',
      },
   ],
   owners: [
      {
         value: 'COMPANY',
         label: 'COMPANY'
      },
      {
         value: 'OWNER',
         label: 'OWNER'
      },
      {
         value: 'PRIVATE_OWNER',
         label: 'PRIVATE_OWNER'
      },
      {
         value: 'OTHER',
         label: 'OTHER'
      }
     
   ],
   colors: [
      {
         value: 'BLACK',
         label: 'Black',
      },
      {
         value: 'BLUE',
         label: 'Blue',
      },
      {
         value: 'BROWN',
         label: 'Brown',
      },
      {
         value: 'GRAY',
         label: 'Gray',
      },
      {
         value: 'CYAN',
         label: 'Cyan',
      },
      {
         value: 'GREEN',
         label: 'Green',
      },
      {
         value: 'ORANGE',
         label: 'Orange',
      },
      {
         value: 'PINK',
         label: 'Pink',
      },
      {
         value: 'PURPLE',
         label: 'purple',
      },
      {
         value: 'RED',
         label: 'red',
      },
      {
         value: 'WHITE',
         label: 'white',
      },
      {
         value: 'YELLOW',
         label: 'yellow',
      },
      {
         value: 'GRADIENT',
         label: 'Gradient',
      },
      {
         value: 'OTHER',
         label: 'Other',
      },
   ],
   types: [
      {
         value: 'AUTOMOBILE',
         label: 'AUTOMOBILE',
      },
      {
         value: 'CONSUMABLES',
         label: 'CONSUMABLES',
      },
      {
         value: 'DETAILS',
         label: 'DETAILS',
      },
      {
         value: 'MOTORCYCLE',
         label: 'MOTORCYCLE',
      },
      {
         value: 'SPECIAL_EQUIPMENTS',
         label: 'SPECIAL_EQUIPMENTS',
      },
   ],
   bodies: [
      {
         value: 'cabriolet',
         label: 'Cabriolet',
      },
      {
         value: 'compact',
         label: 'compact',
      },
      {
         value: 'coupe',
         label: 'coupe',
      },
      {
         value: 'crossover',
         label: 'crossover',
      },
      {
         value: 'hatchback',
         label: 'hatchback',
      },
      {
         value: 'liftback',
         label: 'liftback',
      },
      {
         value: 'offroad',
         label: 'offroad',
      },
      {
         value: 'roadster',
         label: 'roadster',
      },
      {
         value: 'sedan',
         label: 'sedan',
      },
      {
         value: 'universal',
         label: 'universal',
      },
   ],
   
   sortByOptions: [
      {
         value: 'createdAt',
         label: 'createdAt'
      }
   ],
   colorings: [
      {
         value: 'MATTE',
         label: 'Matte'
      },
      {
         value: 'GLOSSY',
         label: 'Glossy'
      },
      {
         value: 'METALLIC',
         label: 'Metallic'
      },
      {
         value: 'NACRE',
         label: 'Nacre'
      },
   ],
};

export const ProductsSlice = createSlice({
   name: 'ProductsSlice',
   initialState,
   reducers: {
      setBrands: (state, action: PayloadAction<ISelectItem<TBrand>[]>) => {
         state.brands = action.payload;
      },
      
   },
});

export default ProductsSlice.reducer;

export const { setBrands } = ProductsSlice.actions;
