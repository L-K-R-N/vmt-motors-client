import cl from './FilterForm.module.scss';
import { SelectController } from '@/components/UI/SelectController/SelectController';
import { useFilterForm } from './useFilterForm';
import { useAppSelector } from '@/hooks/useAppSelector';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController';

interface Props {}

export const FilterForm: React.FC<Props> = () => {
   const { control, errors, handleSubmit, onSubmit } = useFilterForm();
   const { brands, driveUnits, fuels, gears, colors } = useAppSelector(
      (state) => state.FilterReducer,
   );
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
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="carFrom"
                  label="Car from"
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="withPhoto"
                  label="With photo"
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="notSold"
                  label="Not Sold"
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
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
               />
            </div>
            <div className={cl.line}>
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="exchange"
                  label="Exchange"
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="trade"
                  label="Trade"
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="any"
                  label="Any"
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="owner"
                  label="Owner"
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="owner"
                  label="Private owner"
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="owner"
                  label="Company"
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               />
               <h5 className={cl.title}>Seller</h5>
               <button
                  title="Clear filters"
                  type="button"
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
