import { ChangeEvent, useEffect, useState } from 'react';
import cl from './FilterForm.module.scss';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { SelectController } from '@/components/UI/SelectController/SelectController';
import { useFilterForm } from './useFilterForm';
import { useAppSelector } from '@/hooks/useAppSelector';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController';
import { IBrand } from '@/store/reducers/FilterSlice';
import { IOption } from '@/models/Select.types';

interface Props {}

export const FilterForm: React.FC<Props> = () => {
   const dispatch = useAppDispatch();
   const { control, errors, handleSubmit, onSubmit, reset } = useFilterForm();
   const { brands, models, driveUnits, fuels, gears, colors } = useAppSelector(
      (state) => state.FilterReducer,
   );
   const [newBrands, setNewBrands] = useState<IOption[]>([]);
   const [newModels, setNewModels] = useState<IOption[]>([]);
   // const changeForIOption = (items: IBrand[] | IModel[]) => {
   //    let newItems: IOption[] = [];

   //    items.forEach((item) => {
   //       newItems.push({
   //          value: item.name,
   //          label: item.name,
   //       });
   //    });

   //    return newItems;
   // };

   // useEffect(() => {
   //    setNewBrands(changeForIOption(brands));
   //    setNewModels(changeForIOption(models));

   //    console.log(newBrands, newModels, brands, models);
   // }, []);
   return (
      <div className={cl.wrapper}>
         <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={cl.line}>
               <SelectController
                  control={control}
                  errors={errors}
                  name="brand"
                  placeholder="Brand"
                  options={brands}
                  isMulti={false}
                  rules={{ required: false }}
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="model"
                  label="Model"
                  fieldType="input"
                  rules={{ required: false }}
               />{' '}
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="priceFrom"
                  fieldType="input"
                  label="Price from $"
                  rules={{ required: false }}
               />
               <TextFieldController
                  fieldType="input"
                  label="Generation"
                  control={control}
                  errors={errors}
                  name="generation"
                  placeholder="Generation"
                  rules={{ required: false }}
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="yearFrom"
                  label="Year from"
                  fieldType="input"
                  rules={{ required: false }}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="gear"
                  placeholder="Gear"
                  options={gears}
                  rules={{ required: false }}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  rules={{ required: false }}
                  name="fuel"
                  placeholder="Fuel"
                  options={fuels}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  rules={{ required: false }}
                  name="driveUnit"
                  placeholder="Drive unit"
                  options={driveUnits}
                  isMulti={false}
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  rules={{ required: false }}
                  name="priceTo"
                  fieldType="input"
                  label="Price to $"
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="yearTo"
                  label="Year to"
                  fieldType="input"
                  rules={{ required: false }}
               />
            </div>
            <div className={cl.line}>
               <h5 className={cl.title}>Color</h5>
               <h5 className={cl.title}>Car mileage</h5>
               <h5 className={cl.title}>Car from</h5>
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="mileage"
                  fieldType="input"
                  label="Mileage"
                  rules={{ required: false }}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="carFrom"
                  placeholder="Car from"
                  rules={{ required: false }}
                  options={newModels}
                  isMulti={false}
                  disabled
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="withPhoto"
                  placeholder="With photo"
                  rules={{ required: false }}
                  options={newModels}
                  isMulti={false}
                  disabled
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="notSold"
                  placeholder="Not sold"
                  options={newModels}
                  rules={{ required: false }}
                  disabled
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="color"
                  placeholder="Color"
                  options={colors}
                  isMulti={false}
                  rules={{ required: false }}
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="coloring"
                  fieldType="input"
                  rules={{ required: false }}
                  label="Coloring"
                  disabled
               />
            </div>
            <div className={cl.line}>
               <SelectController
                  control={control}
                  errors={errors}
                  name="exchange"
                  placeholder="Exchange"
                  options={newModels}
                  rules={{ required: false }}
                  isMulti={false}
                  disabled
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="trade"
                  placeholder="Trade"
                  options={newModels}
                  rules={{ required: false }}
                  isMulti={false}
                  disabled
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="any"
                  placeholder="Any"
                  options={newModels}
                  rules={{ required: false }}
                  isMulti={false}
                  disabled
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="owner"
                  placeholder="Owner"
                  options={newModels}
                  rules={{ required: false }}
                  isMulti={false}
                  disabled
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="privateOwner"
                  placeholder="Private owner"
                  options={newModels}
                  isMulti={false}
                  disabled
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="company"
                  placeholder="Company"
                  options={newModels}
                  rules={{ required: false }}
                  isMulti={false}
                  disabled
               />
               <h5 className={cl.title}>Seller</h5>
               <button
                  title="Clear filters"
                  type="button"
                  onClick={(e) => reset()}
                  className={cl.resetBtn}
               >
                  Reset
               </button>
               <button
                  title="Show filters"
                  type="submit"
                  className={cl.submitBtn}
               >
                  Show
               </button>
            </div>
         </form>
      </div>
   );
};
