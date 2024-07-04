import cl from './AddAdvertPage.module.scss';
import { useHideSidebar } from '@/hooks/useLayout';
import { useAddAdvert } from './useAddAdvert';
import { useTranslation } from 'react-i18next';
import { Carousel, ConfigProvider } from 'antd';
import Select from 'react-select';

import Slider from 'react-slick';
import ImageUpload from '@/components/layout/ProductPhotoUpload/ProductPhotoUpload';

export interface IBrand {
   id: string;
   name: string;
}
export interface IModel {
   id: string;
   name: string;
   class: string;
   'year-from': number;
   'year-to': number;
   generations: IGeneration[];
}

export interface IGeneration {
   id: string;
   name: string;
   'year-start': number;
   'year-stop': number;
}

export interface IProductType {
   label: string;
   value: string;
   img: string;
}

interface Props {}

const AddAdvertPage: React.FC<Props> = () => {
   useHideSidebar();
   const { t } = useTranslation();

   const {
      handleImageUpload,
      bodies,
      bodySliderSettings,
      brands,
      coloringUnitSliderSettings,
      colorings,
      colors,
      countries,
      createGenerationString,
      desc,
      driveUnitSliderSettings,
      driveUnits,
      filteredBrands,
      fuelSliderSettings,
      fuels,
      gearSliderSettings,
      gears,
      generations,
      handleBrandChange,
      handleModelChange,
      handleGenerationChange,
      handleNumberInputChange,
      handleSearch,
      onSubmit,
      search,
      handleYearChange,
      stage,
      selectedBrand,
      setStage,
      logos,
      selectedModel,
      selectedGeneration,
      models,
      setSelectedType,
      selectedType,
      types,
      handleGenerateYears,
      selectedYear,
      mileage,
      setMileage,
      selectedCountryValue,
      setSelectedCountryValue,
      owners,
      selectedOwnerValue,
      setSelectedOwnerValue,
      selectedBodyValue,
      selectedGearValue,
      selectedFuelValue,
      selectedDriveUnitValue,
      handleDescChange,
      selectedColorValue,
      setSelectedColorValue,
      selectedColoringValue,
      price,
      setPrice,
      isExchange,
      setIsExchange,
      setIsTrade,
      isTrade,
   } = useAddAdvert();

   return (
      <>
         <div className={cl.add}>
            <div className={cl.addHeader}>
               <h3 className={cl.addTitle}>
                  {stage === 1
                     ? t('Select the product type')
                     : stage === 2
                       ? t('Select the product type')
                       : t('submit_your_ad')}
               </h3>
            </div>
            <div className={cl.wrapper}>
               <form className={cl.addForm}>
                  <ConfigProvider
                     theme={{
                        components: {
                           Carousel: {
                              arrowSize: 38,
                              arrowOffset: 26,
                              dotHeight: 5,
                           },
                        },
                     }}
                  >
                     {stage === 1 && (
                        <div className={cl.block}>
                           {/* <h4 className={cl.title}>{t('choose_type')}</h4> */}
                           <Carousel
                              speed={350}
                              arrows
                              afterChange={(i) => {
                                 setSelectedType(types[i].value);
                                 console.log(selectedType);
                              }}
                           >
                              {types.map((type) => (
                                 <div className={cl.typeCard}>
                                    <img src={type.img} alt="" />
                                    <p>{t(type.label)}</p>
                                 </div>
                              ))}
                           </Carousel>
                           <div className={cl.stageControl}>
                              <button
                                 type="button"
                                 className={[
                                    stage <= 5 ? cl.visible : '',
                                    cl.stageBtn,
                                 ].join(' ')}
                                 onClick={() => setStage((prev) => ++prev)}
                              >
                                 {t('next')}
                              </button>
                           </div>
                        </div>
                     )}
                     {stage === 2 && (
                        <div className={cl.block}>
                           <div className={cl.formElem}>
                              <label htmlFor="brand">{t('brand')}</label>
                              <input
                                 title="search"
                                 className={cl.input}
                                 value={search}
                                 onChange={(e) => handleSearch(e.target.value)}
                                 id="brand"
                              />
                              <div className={cl.brands}>
                                 {(filteredBrands.length
                                    ? filteredBrands
                                    : brands
                                 ).map((brand) => (
                                    <div
                                       className={[
                                          cl.brandCard,
                                          brand.value === selectedBrand?.value
                                             ? cl.active
                                             : '',
                                       ].join(' ')}
                                       key={brand.value}
                                       onClick={() => handleBrandChange(brand)}
                                    >
                                       <img
                                          src={logos.find((logo) =>
                                             logo.includes(brand.value),
                                          )}
                                          alt=""
                                       />

                                       {brand.label}
                                    </div>
                                 ))}
                              </div>
                           </div>
                           <div
                              className={[
                                 cl.formElem,
                                 !selectedBrand ? cl.hidden : '',
                              ].join(' ')}
                           >
                              <label htmlFor="model">{t('model')}</label>

                              <Select
                                 // styles={SelectStyles}
                                 placeholder="Model"
                                 id="model"
                                 isMulti={false}
                                 options={models.map((model) => ({
                                    value: model.id,
                                    label: model.name,
                                 }))}
                                 value={{
                                    value: selectedModel?.id,
                                    label: selectedModel?.id,
                                 }}
                                 isDisabled={false}
                                 components={{
                                    DropdownIndicator: null, // Убираем индикатор создания нового значения
                                    IndicatorSeparator: null, // Убираем разделитель индикатора
                                 }}
                                 isClearable={true}
                                 onChange={(newValue) => {
                                    if (newValue) {
                                       handleModelChange(
                                          models.find(
                                             (model) =>
                                                model.id === newValue.value,
                                          ),
                                       );
                                    }
                                 }}
                              />
                           </div>
                           <div
                              className={[
                                 cl.formElem,
                                 !selectedModel ? cl.hidden : '',
                              ].join(' ')}
                           >
                              <label htmlFor="generation">
                                 {t('generation')}
                              </label>

                              <Select
                                 // styles={SelectStyles}
                                 placeholder="Generation"
                                 isMulti={false}
                                 id="generation"
                                 options={generations.map((gen) => ({
                                    value: gen.id,
                                    label: createGenerationString(gen),
                                 }))}
                                 value={{
                                    value: selectedGeneration?.id,
                                    label:
                                       selectedGeneration &&
                                       createGenerationString(
                                          selectedGeneration,
                                       ),
                                 }}
                                 isDisabled={false}
                                 components={{
                                    DropdownIndicator: null, // Убираем индикатор создания нового значения
                                    IndicatorSeparator: null, // Убираем разделитель индикатора
                                 }}
                                 isClearable={true}
                                 onChange={(newValue) => {
                                    if (newValue) {
                                       handleGenerationChange(
                                          generations.find(
                                             (g) => g.id === newValue.value,
                                          ),
                                       );
                                    }
                                 }}
                              />
                           </div>
                           <div
                              className={[
                                 cl.formElem,
                                 !selectedGeneration ? cl.hidden : '',
                              ].join(' ')}
                           >
                              <label htmlFor="year_of_release">
                                 {t('year_of_release')}
                              </label>

                              <Select
                                 // styles={SelectStyles}
                                 placeholder={t('year_of_release')}
                                 isMulti={false}
                                 id="year_of_release"
                                 options={handleGenerateYears(
                                    selectedGeneration?.['year-start'],
                                    selectedGeneration?.['year-stop'],
                                 ).map((year) => ({
                                    label: year,
                                    value: year,
                                 }))}
                                 value={{
                                    value: selectedYear,
                                    label: selectedYear,
                                 }}
                                 isDisabled={false}
                                 components={{
                                    DropdownIndicator: null, // Убираем индикатор создания нового значения
                                    IndicatorSeparator: null, // Убираем разделитель индикатора
                                 }}
                                 isClearable={true}
                                 onChange={(newValue) => {
                                    if (newValue?.value) {
                                       handleYearChange(newValue?.value);
                                    }
                                 }}
                              />
                           </div>
                           <div className={[cl.formElem].join(' ')}>
                              <label htmlFor="mileage">{t('mileage')}</label>
                              <input
                                 title={t('mileage')}
                                 type="text"
                                 id="mileage"
                                 onChange={(e) =>
                                    handleNumberInputChange(
                                       e.target.value,
                                       mileage,
                                       0,
                                       1000000000,
                                       setMileage,
                                    )
                                 }
                                 value={mileage}
                              />
                           </div>
                           <div className={[cl.formElem].join(' ')}>
                              <label htmlFor="car_from">{t('car_from')}</label>

                              <Select
                                 // styles={SelectStyles}
                                 placeholder={t('car_from')}
                                 id="car_from"
                                 isMulti={false}
                                 options={countries}
                                 value={{
                                    label: selectedCountryValue,
                                    value: selectedCountryValue,
                                 }}
                                 isDisabled={false}
                                 components={{
                                    DropdownIndicator: null, // Убираем индикатор создания нового значения
                                    IndicatorSeparator: null, // Убираем разделитель индикатора
                                 }}
                                 isClearable={true}
                                 onChange={(newValue) => {
                                    if (newValue) {
                                       setSelectedCountryValue(newValue.value);
                                    }
                                 }}
                              />
                           </div>
                           <div className={[cl.formElem].join(' ')}>
                              <label htmlFor="owner">{t('owner')}</label>

                              <Select
                                 // styles={SelectStyles}
                                 placeholder={t('owner')}
                                 id="owner"
                                 isMulti={false}
                                 options={owners.map((owner) => ({
                                    label: t(owner.label),
                                    value: t(owner.value),
                                 }))}
                                 value={{
                                    label: selectedOwnerValue
                                       ? t(selectedOwnerValue)
                                       : selectedOwnerValue,
                                    value: selectedOwnerValue
                                       ? t(selectedOwnerValue)
                                       : selectedOwnerValue,
                                 }}
                                 isDisabled={false}
                                 components={{
                                    DropdownIndicator: null, // Убираем индикатор создания нового значения
                                    IndicatorSeparator: null, // Убираем разделитель индикатора
                                 }}
                                 isClearable={true}
                                 onChange={(newValue) => {
                                    if (newValue) {
                                       setSelectedOwnerValue(newValue.label);
                                    }
                                 }}
                              />
                           </div>
                           <div className={cl.stageControl}>
                              <button
                                 type="button"
                                 className={cl.stageBtn}
                                 onClick={() => setStage((prev) => --prev)}
                              >
                                 {t('prev')}
                              </button>
                              <button
                                 type="button"
                                 className={cl.stageBtn}
                                 disabled={
                                    !(
                                       mileage !== undefined &&
                                       selectedYear &&
                                       selectedCountryValue &&
                                       selectedOwnerValue
                                    )
                                 }
                                 onClick={() => setStage((prev) => ++prev)}
                              >
                                 {t('next')}
                              </button>
                           </div>
                        </div>
                     )}
                     {stage === 3 && (
                        <div className={cl.block}>
                           <div className={cl.sliderContainer}>
                              <h4 className={cl.sliderContainer__title}>
                                 Type of car body
                              </h4>
                              <Slider {...bodySliderSettings}>
                                 {bodies.map((body) => (
                                    <div
                                       className={[
                                          cl.bodyCard,
                                          selectedBodyValue === body.value
                                             ? cl.active
                                             : '',
                                       ].join(' ')}
                                    >
                                       <img
                                          src={body.img}
                                          alt={body.value}
                                          className={
                                             selectedBodyValue === body.value
                                                ? cl.active
                                                : ''
                                          }
                                          onClick={() =>
                                             console.log(
                                                selectedBodyValue,
                                                body.value,
                                             )
                                          }
                                       />
                                       <p>{body.value}</p>
                                    </div>
                                 ))}
                              </Slider>
                           </div>
                           <div className={cl.sliderContainer}>
                              <h4 className={cl.sliderContainer__title}>
                                 Type of car gear
                              </h4>
                              <Slider {...gearSliderSettings}>
                                 {gears.map((gear) => (
                                    <div
                                       className={[
                                          cl.bodyCard,
                                          selectedGearValue === gear.value
                                             ? cl.active
                                             : '',
                                       ].join(' ')}
                                    >
                                       <img src={gear.img} alt={gear.value} />
                                       <p>{gear.value}</p>
                                    </div>
                                 ))}
                              </Slider>
                           </div>
                           <div className={cl.sliderContainer}>
                              <h4 className={cl.sliderContainer__title}>
                                 Type of car fuel
                              </h4>
                              <Slider {...fuelSliderSettings}>
                                 {fuels.map((fuel) => (
                                    <div
                                       className={[
                                          cl.bodyCard,
                                          selectedFuelValue === fuel.value
                                             ? cl.active
                                             : '',
                                       ].join(' ')}
                                    >
                                       <img src={fuel.img} alt={fuel.value} />
                                       <p>{fuel.value}</p>
                                    </div>
                                 ))}
                              </Slider>
                           </div>
                           <div className={cl.sliderContainer}>
                              <h4 className={cl.sliderContainer__title}>
                                 Type of car drive unit
                              </h4>
                              <Slider {...driveUnitSliderSettings}>
                                 {driveUnits.map((driveUnit) => (
                                    <div
                                       className={[
                                          cl.bodyCard,
                                          selectedDriveUnitValue ===
                                          driveUnit.value
                                             ? cl.active
                                             : '',
                                       ].join(' ')}
                                    >
                                       <img
                                          src={driveUnit.img}
                                          alt={driveUnit.value}
                                       />
                                       <p>{t(driveUnit.label)}</p>
                                    </div>
                                 ))}
                              </Slider>
                           </div>

                           <div className={cl.stageControl}>
                              <button
                                 type="button"
                                 className={cl.stageBtn}
                                 onClick={() => setStage((prev) => --prev)}
                              >
                                 {t('prev')}
                              </button>
                              <button
                                 type="button"
                                 className={cl.stageBtn}
                                 disabled={
                                    !selectedBodyValue ||
                                    !selectedFuelValue ||
                                    !selectedGearValue ||
                                    !selectedDriveUnitValue
                                 }
                                 onClick={() => setStage((prev) => ++prev)}
                              >
                                 {t('next')}
                              </button>
                           </div>
                        </div>
                     )}
                     {stage === 4 && (
                        <div className={cl.block}>
                           <div className={cl.formElem}>
                              <label htmlFor="photo">{t('photo')}</label>
                              <ImageUpload
                                 maxImageSize={1}
                                 onImageUpload={handleImageUpload}
                                 maxImages={15}
                              />
                           </div>
                           <div className={cl.formElem}>
                              <label htmlFor="desc">{t('desc')}</label>
                              <textarea
                                 id="desc"
                                 onChange={(e) =>
                                    handleDescChange(e.target.value)
                                 }
                                 value={desc}
                              />
                           </div>

                           <div className={cl.formElem}>
                              <label htmlFor="color">{t('color')}</label>
                              <ul className={cl.colors}>
                                 {colors.map((color) => (
                                    <li
                                       className={
                                          selectedColorValue === color.value
                                             ? cl.active
                                             : ''
                                       }
                                       onClick={() =>
                                          setSelectedColorValue(color.value)
                                       }
                                    >
                                       <span
                                          style={{ background: color.value }}
                                       ></span>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                           <div className={cl.block}>
                              <div className={cl.sliderContainer}>
                                 <h4 className={cl.sliderContainer__title}>
                                    Type of coating
                                 </h4>
                                 <Slider {...coloringUnitSliderSettings}>
                                    {colorings.map((coloring) => (
                                       <div
                                          className={[
                                             cl.bodyCard,
                                             selectedColoringValue ===
                                             coloring.value
                                                ? cl.active
                                                : '',
                                          ].join(' ')}
                                       >
                                          <img
                                             src={coloring.img}
                                             alt={coloring.value}
                                             className={
                                                selectedColoringValue ===
                                                coloring.value
                                                   ? cl.active
                                                   : ''
                                             }
                                             onClick={() =>
                                                console.log(
                                                   selectedColoringValue,
                                                   coloring.value,
                                                )
                                             }
                                          />
                                          <p>{coloring.value}</p>
                                       </div>
                                    ))}
                                 </Slider>
                              </div>
                              <div className={[cl.formElem].join(' ')}>
                                 <label htmlFor="price">{t('price')} $</label>
                                 <input
                                    title={t('price')}
                                    type="text"
                                    id="price"
                                    onChange={(e) =>
                                       handleNumberInputChange(
                                          e.target.value,
                                          price,
                                          0,
                                          1000000000,
                                          setPrice,
                                       )
                                    }
                                    value={price}
                                 />
                                 <div>
                                    <input
                                       title={t('exchange')}
                                       id="exchange"
                                       type="checkbox"
                                       checked={isExchange}
                                       onChange={() =>
                                          setIsExchange(!isExchange)
                                       }
                                    />
                                    <label htmlFor="exchange">
                                       An exchange is possible
                                    </label>
                                 </div>
                                 <div>
                                    <input
                                       title={t('trade')}
                                       id="trade"
                                       type="checkbox"
                                       checked={isTrade}
                                       onChange={() => setIsTrade(!isTrade)}
                                    />
                                    <label htmlFor="trade">
                                       Bargaining is appropriate
                                    </label>
                                 </div>
                              </div>
                              <div className={cl.stageControl}>
                                 <button
                                    type="button"
                                    className={cl.stageBtn}
                                    onClick={() => setStage((prev) => --prev)}
                                 >
                                    {t('prev')}
                                 </button>
                                 <button
                                    type="button"
                                    className={cl.stageBtn}
                                    disabled={
                                       !(
                                          selectedColorValue &&
                                          selectedColoringValue &&
                                          price
                                       )
                                    }
                                    onClick={onSubmit}
                                 >
                                    {t('submit')}
                                 </button>
                              </div>
                           </div>
                        </div>
                     )}
                  </ConfigProvider>

                  {/* <Button type='button' type="submit" title={t('place_ad')}>
                     {t('place_ad')}
                  </Button> */}
               </form>
            </div>
         </div>
      </>
   );
};

export default AddAdvertPage;
