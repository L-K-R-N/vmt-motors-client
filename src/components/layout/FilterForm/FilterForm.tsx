import { ChangeEvent } from 'react';
import cl from './FilterForm.module.scss';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Button } from '@/components/UI/Button/Button';
import { SelectController } from '@/components/UI/SelectController/SelectController';
import { useFilterForm } from './useFilterForm';
interface Props {}

interface IFilterInputs {
   brand: string;
   model: string;
}

export const FilterForm: React.FC<Props> = () => {
   const dispatch = useAppDispatch();
   const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {};
   const {
      control,
      errors,
      handleSubmit,
      onSubmit,
      brands,
      models,
      handleBrandChange,
      reset,
   } = useFilterForm();
   return (
      <div className={cl.wrapper}>
         <div className={cl.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={cl.line}>
               <SelectController
                  control={control}
                  errors={errors}
                  name="brand"
                  placeholder="Brand"
                  options={brands}
                  isMulti={false}
                  handleChange={handleBrandChange}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="model"
                  placeholder="Model"
                  options={models}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="priceFrom"
                  placeholder="Price from $"
                  options={models}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="generation"
                  placeholder="Generation"
                  options={models}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="yearFrom"
                  placeholder="Year from"
                  options={models}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="gear"
                  placeholder="Gear"
                  options={models}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="fuel"
                  placeholder="Fuel"
                  options={models}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="driveUnit"
                  placeholder="Drive unit"
                  options={models}
                  isMulti={false}
               />
            </div>
            <div className={cl.line}>
               <h5 className={cl.title}>Color</h5>
               <h5 className={cl.title}>Car mileage</h5>
               <h5 className={cl.title}>Car from</h5>
               <SelectController
                  control={control}
                  errors={errors}
                  name="mileage"
                  placeholder="Mileage"
                  options={models}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="carFrom"
                  placeholder="Car from"
                  options={models}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="withPhoto"
                  placeholder="With photo"
                  options={models}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="notSold"
                  placeholder="Not sold"
                  options={models}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="color"
                  placeholder="Color"
                  options={models}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="coloring"
                  placeholder="Coloring"
                  options={models}
                  isMulti={false}
               />
            </div>
            <div className={cl.line}>
               <SelectController
                  control={control}
                  errors={errors}
                  name="exchange"
                  placeholder="Exchange"
                  options={models}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="trade"
                  placeholder="Trade"
                  options={models}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="any"
                  placeholder="Any"
                  options={models}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="owner"
                  placeholder="Owner"
                  options={models}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="privateOwner"
                  placeholder="Private owner"
                  options={models}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="company"
                  placeholder="Company"
                  options={models}
                  isMulti={false}
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
         </div>
      </div>
   );
};
