import cl from './FilterForm.module.scss';
import { useFilterForm } from './useFilterForm';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setActiveType, setActiveVariant } from '@/store/reducers/FilterSlice';
import { ISelectItem } from '@/api/models/Products';
import ProductService from '@/api/services/ProductService';
import { setProducts, setProductsCount } from '@/store/reducers/ProductsSlice';
import Select from 'react-select';
import { countriesList } from '@/data/constants/countries';
import { IoIosCloseCircle } from 'react-icons/io';
interface Props {}

export const FilterForm: React.FC<Props> = () => {
   const [isShowFilters, setIsShowFilters] = useState(false);
   const {
      control,
      errors,
      handleSubmit,
      onSubmit,
      handleReset,
      isNew,
      handleBrandChange,
      variants,
      handleModelChange,
      handleGenerateYears,
      handleGenerationChange,
      handleNumberInputChange,
      handleYearChange,
      createGenerationString,
      selectedYear,
      models,
      selectedBrand,
      generations,
      selectedGeneration,
      selectedModel,
      priceFrom,
      priceTo,
      setPriceFrom,
      setPriceTo,
      mileageFrom,
      mileageTo,
      setMileageFrom,
      setMileageTo,
      selectedBody,

      selectedDriveUnit,
      selectedFuel,
      selectedGear,
      setSelectedBody,
      setSelectedDriveUnit,
      setSelectedFuel,
      setSelectedGear,
      selectedCountry,
      setSelectedCountry,
      selectedOwner,
      setSelectedColorValue,
      selectedColorValue,
      setSelectedOwner,
      setSelectedColoring,
      selectedColoring,
   } = useFilterForm();
   const dispatch = useAppDispatch();
   const {
      driveUnits,
      fuels,
      gears,
      colors,
      sortByOptions,
      owners,
      colorings,
      bodies,
      types,
      activeVariant,
      activeType,
      brands,
   } = useAppSelector((state) => state.FilterReducer);

   const { t } = useTranslation();

   const handleChangeType = (type: ISelectItem<string>) => {
      dispatch(setActiveType(type));

      try {
         ProductService.getFiltredProducts({
            type: type.value,
            isNew: isNew,
         }).then((res) => {
            dispatch(setProducts(res?.data?.result));
            dispatch(setProductsCount(res?.data?.total));
         });
      } catch (e) {}
   };

   const handleSearch = (type: ISelectItem<string>, variant: string) => {
      try {
         ProductService.getFiltredProducts({
            type: type.value,
            isNew:
               variant === 'new'
                  ? true
                  : variant === 'used_cars'
                    ? false
                    : null,
         }).then((res) => {
            dispatch(setProducts(res?.data?.result));
            dispatch(setProductsCount(res?.data?.total));
         });
      } catch (e) {
         console.log(e);
      }
   };

   useEffect(() => {
      handleSearch(activeType, activeVariant);
   }, [activeType, activeVariant]);

   return (
      <>
         <div className={cl.wrapper}>
            <button
               title={t('toggle_filters')}
               className={cl.toggleFilters}
               onClick={() => setIsShowFilters(!isShowFilters)}
            >
               {' '}
               {t('show_filters')}
               {/* <IoIosSearch /> */}
            </button>
            <div
               className={[cl.container, isShowFilters ? cl.show : ''].join(
                  ' ',
               )}
            >
               <ul className={cl.types}>
                  {types?.map((type) => (
                     <li
                        key={type.label}
                        className={
                           activeType.value === type.value ? cl.active : ''
                        }
                        onClick={() => dispatch(setActiveType(type))}
                     >
                        {t(type.label)}
                     </li>
                  ))}
               </ul>

               <form className={cl.form} onSubmit={handleSubmit(onSubmit)}>
                  <ul className={cl.variants}>
                     {variants?.map((v) => (
                        <li
                           className={activeVariant === v ? cl.active : ''}
                           key={v}
                           onClick={() => dispatch(setActiveVariant(v))}
                        >
                           {t(v)}
                        </li>
                     ))}
                  </ul>
                  {/* <div className={cl.line}>
                     <TextFieldController
                        control={control}
                        errors={errors}
                        name="name"
                        label={t('name')}
                        fieldType="input"
                        rules={{ required: false }}
                     />
                  </div> */}
                  <div className={cl.column}>
                     <div className={[cl.formElem].join(' ')}>
                        <div className={cl.select}>
                           <Select
                              // styles={SelectStyles}
                              placeholder={t('brand')}
                              id="brand"
                              isMulti={false}
                              options={brands}
                              value={selectedBrand}
                              isDisabled={false}
                              components={{
                                 // DropdownIndicator: null, // Убираем индикатор создания нового значения
                                 IndicatorSeparator: null, // Убираем разделитель индикатора
                              }}
                              isClearable={true}
                              onChange={(newValue) => {
                                 // if (newValue) {
                                 handleBrandChange(newValue);
                                 // }
                              }}
                           />
                        </div>
                     </div>
                     <div
                        className={[
                           cl.formElem,
                           !selectedBrand ? cl.hidden : '',
                        ].join(' ')}
                     >
                        <div className={cl.select}>
                           <Select
                              // styles={SelectStyles}
                              placeholder={t('model')}
                              id="model"
                              isMulti={false}
                              options={models.map((model) => ({
                                 value: model.id,
                                 label: model.name,
                              }))}
                              value={
                                 selectedModel
                                    ? {
                                         value: selectedModel.id,
                                         label: selectedModel.name,
                                      }
                                    : null
                              }
                              isDisabled={!selectedBrand}
                              components={{
                                 // DropdownIndicator: null, // Убираем индикатор создания нового значения
                                 IndicatorSeparator: null, // Убираем разделитель индикатора
                              }}
                              isClearable={true}
                              onChange={(newValue) => {
                                 // if (newValue) {
                                 const newModel = models.find(
                                    (model) => model.id === newValue?.value,
                                 );
                                 handleModelChange(newModel ? newModel : null);
                                 // }
                              }}
                           />
                        </div>
                     </div>
                     <div
                        className={[
                           cl.formElem,
                           !selectedModel ? cl.hidden : '',
                        ].join(' ')}
                     >
                        <div className={cl.select}>
                           <Select
                              // styles={SelectStyles}
                              placeholder="Generation"
                              isMulti={false}
                              id="generation"
                              options={generations.map((gen) => ({
                                 value: gen.id,
                                 label: createGenerationString(gen),
                              }))}
                              value={
                                 selectedGeneration
                                    ? {
                                         value: selectedGeneration?.id,
                                         label:
                                            selectedGeneration &&
                                            createGenerationString(
                                               selectedGeneration,
                                            ),
                                      }
                                    : null
                              }
                              isDisabled={!selectedModel}
                              components={{
                                 // DropdownIndicator: null, // Убираем индикатор создания нового значения
                                 IndicatorSeparator: null, // Убираем разделитель индикатора
                              }}
                              isClearable={true}
                              onChange={(newValue) => {
                                 const newGen = generations.find(
                                    (g) => g.id === newValue?.value,
                                 );
                                 handleGenerationChange(newGen || null);
                              }}
                           />
                        </div>
                     </div>
                     <div
                        className={[
                           cl.formElem,

                           !selectedGeneration ? cl.hidden : '',
                        ].join(' ')}
                     >
                        <label>{t('year_of_release')}</label>
                        <div className={cl.groupInput}>
                           <div className={cl.select}>
                              <Select
                                 // styles={SelectStyles}
                                 placeholder={t('from')}
                                 isMulti={false}
                                 options={handleGenerateYears(
                                    selectedGeneration?.['year-start'],
                                    selectedGeneration?.['year-stop'],
                                 ).map((year) => ({
                                    label: year,
                                    value: year,
                                 }))}
                                 value={
                                    selectedYear?.from
                                       ? {
                                            value: selectedYear?.from,
                                            label: selectedYear?.from,
                                         }
                                       : null
                                 }
                                 isDisabled={!selectedGeneration}
                                 components={{
                                    // DropdownIndicator: null, // Убираем индикатор создания нового значения
                                    IndicatorSeparator: null, // Убираем разделитель индикатора
                                 }}
                                 isClearable={true}
                                 onChange={(newValue) => {
                                    // if (newValue?.value) {
                                    handleYearChange({
                                       from: newValue?.value,
                                       to: selectedYear?.to,
                                    });
                                    // }
                                 }}
                              />
                           </div>
                           <div className={cl.select}>
                              <Select
                                 // styles={SelectStyles}
                                 placeholder={t('to')}
                                 isMulti={false}
                                 options={handleGenerateYears(
                                    selectedYear?.from
                                       ? selectedYear?.from
                                       : selectedGeneration?.['year-start'],
                                    selectedGeneration?.['year-stop'],
                                 ).map((year) => ({
                                    label: year,
                                    value: year,
                                 }))}
                                 value={
                                    selectedYear?.to
                                       ? {
                                            value: selectedYear?.to,
                                            label: selectedYear?.to,
                                         }
                                       : null
                                 }
                                 isDisabled={!selectedGeneration}
                                 components={{
                                    // DropdownIndicator: null, // Убираем индикатор создания нового значения
                                    IndicatorSeparator: null, // Убираем разделитель индикатора
                                 }}
                                 isClearable={true}
                                 onChange={(newValue) => {
                                    // if (newValue?.value) {
                                    handleYearChange({
                                       to: newValue?.value,
                                       from: selectedYear?.from,
                                    });
                                    // }
                                 }}
                              />
                           </div>
                        </div>
                     </div>
                     <div
                        className={[
                           cl.formElem,

                           !selectedGeneration ? cl.hidden : '',
                        ].join(' ')}
                     >
                        <label>{t('price')}</label>
                        <div className={cl.groupInput}>
                           <div className={cl.input}>
                              <input
                                 title={t('price_from')}
                                 type="text"
                                 autoComplete="off"
                                 placeholder={t('from')}
                                 onChange={(e) =>
                                    handleNumberInputChange(
                                       e.target.value,
                                       priceFrom,
                                       0,
                                       1000000000,
                                       setPriceFrom,
                                    )
                                 }
                                 value={priceFrom}
                              />
                           </div>

                           <div className={cl.input}>
                              <input
                                 title={t('price_to')}
                                 type="text"
                                 placeholder={t('to')}
                                 autoComplete="off"
                                 onChange={(e) =>
                                    handleNumberInputChange(
                                       e.target.value,
                                       priceTo,
                                       0,
                                       1000000000,
                                       setPriceTo,
                                    )
                                 }
                                 value={priceTo}
                              />
                           </div>
                        </div>
                     </div>
                     <div
                        className={[
                           cl.formElem,

                           !selectedGeneration ? cl.hidden : '',
                        ].join(' ')}
                     >
                        <label>{t('mileage')}</label>

                        <div className={cl.groupInput}>
                           <div className={cl.input}>
                              <input
                                 title={t('mileage_from')}
                                 type="text"
                                 autoComplete="off"
                                 placeholder={t('from')}
                                 onChange={(e) =>
                                    handleNumberInputChange(
                                       e.target.value,
                                       mileageFrom,
                                       0,
                                       1000000000,
                                       setMileageFrom,
                                    )
                                 }
                                 value={mileageFrom}
                              />
                           </div>

                           <div className={cl.input}>
                              <input
                                 title={t('mileage_to')}
                                 type="text"
                                 placeholder={t('to')}
                                 autoComplete="off"
                                 onChange={(e) =>
                                    handleNumberInputChange(
                                       e.target.value,
                                       mileageTo,
                                       0,
                                       1000000000,
                                       setMileageTo,
                                    )
                                 }
                                 value={mileageTo}
                              />
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className={cl.column}>
                     <div
                        className={[
                           cl.formElem,
                           !selectedBrand ? cl.hidden : '',
                        ].join(' ')}
                     >
                        <div className={cl.select}>
                           <Select
                              // styles={SelectStyles}
                              placeholder={t('body')}
                              id="body"
                              isMulti={false}
                              options={bodies.map((body) => ({
                                 label: t(body.label),
                                 value: body.value,
                              }))}
                              value={selectedBody}
                              components={{
                                 // DropdownIndicator: null, // Убираем индикатор создания нового значения
                                 IndicatorSeparator: null, // Убираем разделитель индикатора
                              }}
                              isClearable={true}
                              onChange={(newValue) => {
                                 setSelectedBody(newValue);
                              }}
                           />
                        </div>
                     </div>
                     <div
                        className={[
                           cl.formElem,
                           !selectedBrand ? cl.hidden : '',
                        ].join(' ')}
                     >
                        <div className={cl.select}>
                           <Select
                              // styles={SelectStyles}
                              placeholder={t('fuel')}
                              id="fuel"
                              isMulti={false}
                              options={fuels.map((fuel) => ({
                                 label: t(fuel.label),
                                 value: fuel.value,
                              }))}
                              value={selectedFuel}
                              components={{
                                 // DropdownIndicator: null, // Убираем индикатор создания нового значения
                                 IndicatorSeparator: null, // Убираем разделитель индикатора
                              }}
                              isClearable={true}
                              onChange={(newValue) => {
                                 setSelectedFuel(newValue);
                              }}
                           />
                        </div>
                     </div>
                     <div
                        className={[
                           cl.formElem,
                           !selectedBrand ? cl.hidden : '',
                        ].join(' ')}
                     >
                        <div className={cl.select}>
                           <Select
                              // styles={SelectStyles}
                              placeholder={t('drive_unit')}
                              id="drive_unit"
                              isMulti={false}
                              options={driveUnits.map((v) => ({
                                 label: t(v.label),
                                 value: v.value,
                              }))}
                              value={selectedDriveUnit}
                              components={{
                                 // DropdownIndicator: null, // Убираем индикатор создания нового значения
                                 IndicatorSeparator: null, // Убираем разделитель индикатора
                              }}
                              isClearable={true}
                              onChange={(newValue) => {
                                 setSelectedDriveUnit(newValue);
                              }}
                           />
                        </div>
                     </div>
                     <div
                        className={[
                           cl.formElem,
                           !selectedBrand ? cl.hidden : '',
                        ].join(' ')}
                     >
                        <div className={cl.select}>
                           <Select
                              // styles={SelectStyles}
                              placeholder={t('gear')}
                              id="gear"
                              isMulti={false}
                              options={gears.map((gear) => ({
                                 label: t(gear.label),
                                 value: gear.value,
                              }))}
                              value={selectedGear}
                              components={{
                                 // DropdownIndicator: null, // Убираем индикатор создания нового значения
                                 IndicatorSeparator: null, // Убираем разделитель индикатора
                              }}
                              isClearable={true}
                              onChange={(newValue) => {
                                 setSelectedGear(newValue);
                              }}
                           />
                        </div>
                     </div>
                     <div
                        className={[
                           cl.formElem,
                           !selectedBrand ? cl.hidden : '',
                        ].join(' ')}
                     >
                        <div className={cl.select}>
                           <Select
                              // styles={SelectStyles}
                              placeholder={t('country')}
                              id="country"
                              isMulti={false}
                              options={countriesList}
                              value={selectedCountry}
                              components={{
                                 // DropdownIndicator: null, // Убираем индикатор создания нового значения
                                 IndicatorSeparator: null, // Убираем разделитель индикатора
                              }}
                              isClearable={true}
                              onChange={(newValue) => {
                                 setSelectedCountry(newValue);
                              }}
                           />
                        </div>
                     </div>
                     <div
                        className={[
                           cl.formElem,
                           !selectedBrand ? cl.hidden : '',
                        ].join(' ')}
                     >
                        <div className={cl.select}>
                           <Select
                              // styles={SelectStyles}
                              placeholder={t('owner')}
                              id="owner"
                              isMulti={false}
                              options={owners.map((owner) => ({
                                 label: t(owner.label),
                                 value: owner.value,
                              }))}
                              value={selectedOwner}
                              components={{
                                 // DropdownIndicator: null, // Убираем индикатор создания нового значения
                                 IndicatorSeparator: null, // Убираем разделитель индикатора
                              }}
                              isClearable={true}
                              onChange={(newValue) => {
                                 setSelectedOwner(newValue);
                              }}
                           />
                        </div>
                     </div>
                  </div>
                  <div className={cl.column}>
                     {/* <div className={cl.formElem}> */}
                     <ul className={cl.colors}>
                        {colors.map((color) => (
                           <li
                              className={
                                 selectedColorValue === color.value
                                    ? cl.active
                                    : ''
                              }
                              onClick={() => setSelectedColorValue(color.value)}
                           >
                              <span style={{ background: color.value }}></span>
                           </li>
                        ))}
                     </ul>
                     {/* </div> */}
                     <div
                        className={[
                           cl.formElem,
                           !selectedBrand ? cl.hidden : '',
                        ].join(' ')}
                     >
                        <div className={cl.select}>
                           <Select
                              // styles={SelectStyles}
                              placeholder={t('coloring')}
                              id="coloring"
                              isMulti={false}
                              options={colorings.map((c) => ({
                                 label: t(c.label),
                                 value: c.value,
                              }))}
                              value={selectedColoring}
                              components={{
                                 // DropdownIndicator: null, // Убираем индикатор создания нового значения
                                 IndicatorSeparator: null, // Убираем разделитель индикатора
                              }}
                              isClearable={true}
                              onChange={(newValue) => {
                                 setSelectedColoring(newValue);
                              }}
                           />
                        </div>
                     </div>
                  </div>

                  <div className={cl.buttons}>
                     <button
                        title={t('reset')}
                        type="button"
                        className={cl.resetBtn}
                        onClick={() => handleReset()}
                     >
                        {/* {t('reset_filters')} */}
                        <IoIosCloseCircle /> Reset filters
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
         </div>
      </>
   );
};
