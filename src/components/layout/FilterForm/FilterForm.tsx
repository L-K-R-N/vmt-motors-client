import cl from './FilterForm.module.scss';
import { SelectController } from '@/components/UI/SelectController/SelectController';
import { useFilterForm } from './useFilterForm';
import { useAppSelector } from '@/hooks/useAppSelector';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController';
import { useTranslation } from 'react-i18next';

interface Props {}

export const FilterForm: React.FC<Props> = () => {
   const { control, errors, handleSubmit, onSubmit } = useFilterForm();
   const { brands, driveUnits, fuels, gears, colors } = useAppSelector(
      (state) => state.FilterReducer,
   );

   const { t } = useTranslation();
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
                  placeholder={t('brand')}
                  options={brands}
                  isMulti={false}
                  rules={{ required: false }}
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="model"
                  label={t('model')}
                  fieldType="input"
                  rules={{ required: false }}
               />{' '}
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="priceFrom"
                  fieldType="input"
                  label={`${t('priceFrom')} $`}
                  rules={{ required: false }}
               />
               <TextFieldController
                  fieldType="input"
                  label={t('generation')}
                  control={control}
                  errors={errors}
                  name="generation"
                  rules={{ required: false }}
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="yearFrom"
                  label={t('yearFrom')}
                  fieldType="input"
                  rules={{ required: false }}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="gear"
                  placeholder={t('gear')}
                  options={gears}
                  rules={{ required: false }}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  rules={{ required: false }}
                  name="fuel"
                  placeholder={t('fuel')}
                  options={fuels}
                  isMulti={false}
               />
               <SelectController
                  control={control}
                  errors={errors}
                  rules={{ required: false }}
                  name="driveUnit"
                  placeholder={t('driveUnit')}
                  options={driveUnits}
                  isMulti={false}
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  rules={{ required: false }}
                  name="priceTo"
                  fieldType="input"
                  label={`${t('priceTo')} $`}
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="yearTo"
                  label={t('yearTo')}
                  fieldType="input"
                  rules={{ required: false }}
               />
            </div>
            <div className={cl.line}>
               <h5 className={cl.title}>{t('color')}</h5>
               <h5 className={cl.title}>{t('carMileage')}</h5>
               <h5 className={cl.title}>{t('carFrom')}</h5>
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="mileage"
                  fieldType="input"
                  label={t('mileage')}
                  rules={{ required: false }}
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="carFrom"
                  label={t('carFrom')}
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="withPhoto"
                  label={t('withPhoto')}
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="notSold"
                  label={t('notSold')}
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               />
               <SelectController
                  control={control}
                  errors={errors}
                  name="color"
                  placeholder={t('color')}
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
                  label={t('coloring')}
               />
            </div>
            <div className={cl.line}>
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="exchange"
                  label={t('exchange')}
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="trade"
                  label={t('trade')}
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="any"
                  label={t('any')}
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="owner"
                  label={t('owner')}
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="owner"
                  label={t('privateOwner')}
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               />
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="owner"
                  label={t('Company')}
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               />
               <h5 className={cl.title}>{t('seller')}</h5>
               <button
                  title="Clear filters"
                  type="button"
                  className={cl.resetBtn}
               >
                  {t('reset')}
               </button>
               <button
                  title="Show filters"
                  type="submit"
                  className={cl.submitBtn}
               >
                  {t('show')}
               </button>
            </div>
         </form>
      </div>
   );
};
