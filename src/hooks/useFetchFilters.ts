import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { setBrands, setModels } from '@/store/reducers/FilterSlice';
// import { brands } from '../data/brands.json';
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

export const useFetchFilters = () => {
   const [localMakes, setLocalMakes] = useState<string[]>([]);
   const [localModels, setLocalModels] = useState<string[]>([]);
   const [localGenerations, setLocalGenerations] = useState<string[]>([]);
   const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null);
   const [selectedModel, setSelectedModel] = useState<IModel | null>(null);
   const [selectedGeneration, setSelectedGeneration] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const dispatch = useAppDispatch();
   useEffect(() => {
      // onFilterChange(selectedBrand, selectedModel);
   }, [selectedBrand, selectedModel]);

   // const handleBrandChange = (brand: IBrand) => {
   //    setSelectedBrand(brand);
   //    setSelectedModel(null);
   //    console.log(brand);

   //    // Загрузка моделей для выбранной марки
   //    import(`../data/models/${brand.id}.json`).then(
   //       (data: { default: IModel[] }) => {
   //          console.log(data.default);
   //          dispatch(
   //             setModels(
   //                data.default?.map((model) => ({
   //                   value: model.id,
   //                   label: model.name,
   //                })),
   //             ),
   //          );
   //       },
   //    );
   // };

   // useEffect(() => {
   //    const newBrands = brands?.map((brand) => ({
   //       value: brand.id,
   //       label: brand.name,
   //    }));
   //    dispatch(setBrands(newBrands));
   // }, []);

   // const handleModelChange = (model: IModel) => {
   //    setSelectedModel(model);
   // };
   // useEffect(() => {
   //    const fetchMakes = async () => {
   //       setIsLoading(true);
   //       try {
   //          const response = await axios.get<IManufacturersResponse>(
   //             'https://vpic.nhtsa.dot.gov/api/vehicles/GetAllManufacturers?format=json',
   //          );
   //          // console.log(response)

   //          setLocalMakes(
   //             response?.data?.Results?.map((car) => car.Mfr_CommonName),
   //          );
   //          dispatch(
   //             setBrands(
   //                response?.data?.Results?.map((car) => ({
   //                   value: car.Mfr_CommonName,
   //                   label: car.Mfr_CommonName,
   //                })),
   //             ),
   //          );

   //          setIsLoading(false);

   //          // const makesResponse = await axios.get<IResponse>(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${'bmw'}?format=json`);
   //          // console.log(makesResponse)
   //       } catch (error) {
   //          console.error('Error fetching makes:', error);
   //          setIsLoading(false);
   //       }
   //    };
   //    fetchMakes();
   // }, []);

   // useEffect(() => {
   //    console.log(1);
   //    setIsLoading(true);
   //    const fetchModels = async () => {
   //       try {
   //          const makesResponse = await axios.get<IModelsResponse>(
   //             `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${selectedMake}?format=json`,
   //          );
   //          setLocalModels(
   //             makesresponse?.data?.Results?.map((car) => car.Model_Name),
   //          );
   //          dispatch(
   //             setModels(
   //                makesresponse?.data?.Results?.map((car) => ({
   //                   value: car.Model_Name,
   //                   label: car.Model_Name,
   //                })),
   //             ),
   //          );

   //          setIsLoading(false);
   //       } catch (error) {
   //          console.error('Error fetching models:', error);
   //          setIsLoading(false);
   //       }
   //    };
   //    if (selectedMake) {
   //       fetchModels();
   //    }
   // }, [selectedMake]);

   // useEffect(() => {
   //     const fetchGenerations = async () => {
   //     try {
   //     const response = await axios.get<IFilter[]>(`https://api.thecarsdb.com/v2/generations?make=${selectedMake}&model=${selectedModel}`);
   //     setLocalGenerations(response?.data?.map((car) => car.generation));
   //     dispatch(setGenerations(response?.data?.map((car) => ({
   //         value: car.make,
   //         label: car.make
   //      }))))
   //     } catch (error) {
   //     console.error('Error fetching generations:', error);
   //     }
   //     };
   //     if (selectedMake && selectedModel) {
   //     fetchGenerations();
   //     }
   // }, [selectedMake, selectedModel]);

   // const handleMakeChange = (make: string) => {
   //    setSelectedMake(make);
   //    setSelectedModel('');
   //    setSelectedGeneration('');
   // };

   // const handleGenerationChange = (generation: string) => {
   //    setSelectedGeneration(generation);
   // };

   return {
      // handleModelChange,
      localMakes,
      localModels,
      // handleBrandChange,
      localGenerations,
      isLoading,
   };
};
