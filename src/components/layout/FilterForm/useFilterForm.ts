import { useMemo } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppDispatch } from '@/hooks/useAppDispatch.js';
import { useAppSelector } from '@/hooks/useAppSelector';
import { IProduct, setFiltredProducts } from '@/store/reducers/ProductsSlice';
import { ISelectItem, TBrand, TColor } from '@/store/reducers/FilterSlice';
import { TDriveUnit, TFuel, TGear } from '@/api/services/ProductService';

interface IFilterInputs {
   brand: ISelectItem<TBrand>;
   model: string;
   priceFrom: number;
   priceTo: number;
   generation: string;
   yearFrom: string;
   yearTo: string;
   gear: ISelectItem<TGear>;
   fuel: ISelectItem<TFuel>;
   driveUnit: ISelectItem<TDriveUnit>;
   color: ISelectItem<TColor>;
   coloring: string;
   withPhoto: boolean;
   notSold: boolean;
   mileage: number;
   carFrom: string;
   exchange: boolean;
   trade: boolean;
   any: boolean;
   owner: boolean;
   privateOwner: boolean;
   company: boolean;
}

export const useFilterForm = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
      reset,
   } = useForm<IFilterInputs>({
      mode: 'onChange',
   });
   const dispatch = useAppDispatch();
   const { products } = useAppSelector((state) => state.ProductsReducer);
   // const [newProducts, setNewProducts] = useState<IProduct[]>(products);
   const { brands, models } = useAppSelector((state) => state.FilterReducer);

   const onSubmit: SubmitHandler<IFilterInputs> = (data) => {
      let newProducts: IProduct[] = [...products];

      const {
         brand,
         color,
         driveUnit,
         fuel,
         gear,
         mileage,

         priceFrom,
         priceTo,

         withPhoto,
         yearFrom,
         yearTo,
      } = data;

      if (brand) {
         newProducts = newProducts.filter((p) => p.brand.value === brand.value);
      }

      if (fuel) {
         newProducts = newProducts.filter((p) => p.fuel.value === fuel.value);
      }
      if (gear) {
         newProducts = newProducts.filter((p) => p.gear.value === gear.value);
      }
      if (driveUnit) {
         newProducts = newProducts.filter(
            (p) => p.driveUnit.value === driveUnit.value,
         );
      }
      if (color) {
         newProducts = newProducts.filter((p) => p.color === color.value);
      }

      if (priceFrom) {
         newProducts = newProducts.filter((p) => p.price >= priceFrom);
      }
      if (priceTo) {
         newProducts = newProducts.filter((p) => p.price <= priceTo);
      }
      if (mileage) {
         newProducts = newProducts.filter((p) => p.mileage <= mileage);
      }
      if (withPhoto) {
         newProducts = newProducts.filter((p) => p.photoId);
      }
      if (yearFrom) {
         newProducts = newProducts.filter((p) => p.year >= Number(yearFrom));
      }
      if (yearTo) {
         newProducts = newProducts.filter((p) => {
            console.log(yearTo, p.year);
            return p.year <= Number(yearTo);
         });
      }

      // console.log(
      //    newProducts.filter((p) => p.brand.value === data.brand.value),
      // );
      dispatch(setFiltredProducts(newProducts));
   };
   return useMemo(
      () => ({
         errors,
         onSubmit,
         control,
         handleSubmit,

         reset,
      }),
      [errors, brands, models],
   );
};
