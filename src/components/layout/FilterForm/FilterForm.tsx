import cl from './FilterForm.module.scss';
import { SelectController } from '@/components/UI/SelectController/SelectController';
import { useFilterForm } from './useFilterForm';
import { useAppSelector } from '@/hooks/useAppSelector';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController';
import { useTranslation } from 'react-i18next';
import { CheckboxController } from '@/components/UI/CheckboxController/CheckboxController';

interface Props {}

export const FilterForm: React.FC<Props> = () => {
   const { control, errors, handleSubmit, onSubmit, handleReset } =
      useFilterForm();
   const {
      brands,
      driveUnits,
      fuels,
      gears,
      colors,
      sortByOptions,
      owners,
      colorings,
      bodies,
      types,
      models,
   } = useAppSelector((state) => state.FilterReducer);

   const { t } = useTranslation();

   return (
      <>
         <div className={cl.wrapper}>
            <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
               <TextFieldController
                  control={control}
                  errors={errors}
                  name="name"
                  label={t('name')}
                  fieldType="input"
                  rules={{ required: false }}
               />
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
                  <SelectController
                     control={control}
                     errors={errors}
                     name="model"
                     placeholder={t('model')}
                     isMulti={false}
                     options={models}
                     // handleChange={() => handleModelChange()}
                  />

                  <TextFieldController
                     control={control}
                     errors={errors}
                     name="yearFrom"
                     label={t('year_from')}
                     fieldType="input"
                     rules={{ required: false }}
                  />
                  <SelectController
                     control={control}
                     errors={errors}
                     rules={{ required: false }}
                     name="driveUnit"
                     placeholder={t('drive_unit')}
                     options={driveUnits}
                     isMulti={false}
                  />

                  <TextFieldController
                     fieldType="input"
                     label={t('generation')}
                     control={control}
                     errors={errors}
                     name="generation"
                     rules={{ required: false }}
                  />
                  <SelectController
                     control={control}
                     errors={errors}
                     name="sortBy"
                     placeholder={t('sort_by')}
                     rules={{ required: false }}
                     isMulti={false}
                     options={sortByOptions}
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

                  <TextFieldController
                     control={control}
                     errors={errors}
                     name="priceFrom"
                     fieldType="input"
                     label={`${t('price_from')} $`}
                     rules={{ required: false }}
                  />

                  <TextFieldController
                     control={control}
                     errors={errors}
                     rules={{ required: false }}
                     name="priceTo"
                     fieldType="input"
                     label={`${t('price_to')} $`}
                  />

                  <TextFieldController
                     control={control}
                     errors={errors}
                     name="yearTo"
                     label={t('year_to')}
                     fieldType="input"
                     rules={{ required: false }}
                  />

                  <SelectController
                     control={control}
                     errors={errors}
                     name="body"
                     placeholder={t('body')}
                     options={bodies}
                     isMulti={false}
                     rules={{ required: false }}
                  />
               </div>
               <div className={cl.line}>
                  <h5 className={cl.title}>{t('color')}</h5>
                  <h5 className={cl.title}>{t('mileage')}</h5>
                  <h5 className={cl.title}>{t('car_from')}</h5>
                  <TextFieldController
                     control={control}
                     errors={errors}
                     name="millageFrom"
                     fieldType="input"
                     label={t('millage_from')}
                     rules={{ required: false }}
                  />
                  <TextFieldController
                     control={control}
                     errors={errors}
                     name="millageTo"
                     fieldType="input"
                     label={t('mileage_to')}
                     rules={{ required: false }}
                  />

                  <TextFieldController
                     control={control}
                     errors={errors}
                     name="from"
                     label={t('car_from')}
                     fieldType="input"
                     rules={{ required: false }}
                  />
                  {/* <TextFieldController
                  control={control}
                  errors={errors}
                  name="withPhoto"
                  label={t('with_photo')}
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               /> */}
                  {/* <TextFieldController
                  control={control}
                  errors={errors}
                  name="notSold"
                  label={t('not_sold')}
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               /> */}
                  <SelectController
                     control={control}
                     errors={errors}
                     name="color"
                     placeholder={t('color')}
                     options={colors}
                     isMulti={false}
                     rules={{ required: false }}
                  />

                  <SelectController
                     control={control}
                     errors={errors}
                     name="coloring"
                     rules={{ required: false }}
                     placeholder={t('coloring')}
                     options={colorings}
                     isMulti={false}
                  />
               </div>
               <div className={cl.line}>
                  <CheckboxController
                     control={control}
                     errors={errors}
                     name="exchange"
                     label={t('exchange')}
                     fieldType="input"
                     rules={{ required: false }}
                  />
                  <CheckboxController
                     control={control}
                     errors={errors}
                     name="trade"
                     label={t('trade')}
                     fieldType="input"
                     rules={{ required: false }}
                  />
                  <CheckboxController
                     control={control}
                     errors={errors}
                     name="isNew"
                     label={t('is_new')}
                     fieldType="input"
                     rules={{ required: false }}
                  />
                  <CheckboxController
                     control={control}
                     errors={errors}
                     name="reverse"
                     label={t('reverse')}
                     fieldType="input"
                     rules={{ required: false }}
                  />

                  {/* <TextFieldController
                  control={control}
                  errors={errors}
                  name="any"
                  label={t('any')}
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               /> */}
                  {/* <TextFieldController
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
                  label={t('private_owner')}
                  fieldType="input"
                  rules={{ required: false }}
                  disabled
               /> */}
                  <SelectController
                     control={control}
                     errors={errors}
                     name="type"
                     placeholder={t('type')}
                     rules={{ required: false }}
                     isMulti={false}
                     options={types}
                  />
                  <SelectController
                     control={control}
                     errors={errors}
                     name="owner"
                     placeholder={t('owner')}
                     rules={{ required: false }}
                     isMulti={false}
                     options={owners}
                  />
                  <button
                     title={t('reset')}
                     type="button"
                     className={cl.resetBtn}
                     onClick={() => handleReset()}
                  >
                     {t('reset')}
                  </button>
                  <button
                     title={t('show')}
                     type="submit"
                     className={cl.submitBtn}
                  >
                     {t('show')}
                  </button>
               </div>
            </form>
         </div>
      </>
   );
};
