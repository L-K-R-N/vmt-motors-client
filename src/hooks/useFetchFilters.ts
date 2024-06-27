import axios from 'axios';
import { useState, useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { setBrands, setModels } from '@/store/reducers/FilterSlice';

interface IManufacturersResponse {
   Results: {
      Mfr_CommonName: string;
   }[];
}
interface IModelsResponse {
   Results: {
      Model_Name: string;
   }[];
}

export const useFetchFilters = () => {
   const [localMakes, setLocalMakes] = useState<string[]>([]);
   const [localModels, setLocalModels] = useState<string[]>([]);
   const [localGenerations, setLocalGenerations] = useState<string[]>([]);
   const [selectedMake, setSelectedMake] = useState('');
   const [selectedModel, setSelectedModel] = useState('');
   const [selectedGeneration, setSelectedGeneration] = useState('');
   const [isLoading, setIsLoading] = useState(false);
   const dispatch = useAppDispatch();

   useEffect(() => {
      const fetchMakes = async () => {
         setIsLoading(true);
         try {
            const response = await axios.get<IManufacturersResponse>(
               'https://vpic.nhtsa.dot.gov/api/vehicles/GetAllManufacturers?format=json',
            );
            // console.log(response)

            setLocalMakes(
               response.data.Results.map((car) => car.Mfr_CommonName),
            );
            dispatch(
               setBrands(
                  response.data.Results.map((car) => ({
                     value: car.Mfr_CommonName,
                     label: car.Mfr_CommonName,
                  })),
               ),
            );

            setIsLoading(false);

            // const makesResponse = await axios.get<IResponse>(`https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${'bmw'}?format=json`);
            // console.log(makesResponse)
         } catch (error) {
            console.error('Error fetching makes:', error);
            setIsLoading(false);
         }
      };
      fetchMakes();
   }, []);

   useEffect(() => {
      console.log(1);
      setIsLoading(true);
      const fetchModels = async () => {
         try {
            const makesResponse = await axios.get<IModelsResponse>(
               `https://vpic.nhtsa.dot.gov/api/vehicles/GetModelsForMake/${selectedMake}?format=json`,
            );
            setLocalModels(
               makesResponse.data.Results.map((car) => car.Model_Name),
            );
            dispatch(
               setModels(
                  makesResponse.data.Results.map((car) => ({
                     value: car.Model_Name,
                     label: car.Model_Name,
                  })),
               ),
            );

            setIsLoading(false);
         } catch (error) {
            console.error('Error fetching models:', error);
            setIsLoading(false);
         }
      };
      if (selectedMake) {
         fetchModels();
      }
   }, [selectedMake]);

   // useEffect(() => {
   //     const fetchGenerations = async () => {
   //     try {
   //     const response = await axios.get<IFilter[]>(`https://api.thecarsdb.com/v2/generations?make=${selectedMake}&model=${selectedModel}`);
   //     setLocalGenerations(response.data.map((car) => car.generation));
   //     dispatch(setGenerations(response.data.map((car) => ({
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

   const handleMakeChange = (make: string) => {
      setSelectedMake(make);
      setSelectedModel('');
      setSelectedGeneration('');
   };

   const handleModelChange = (model: string) => {
      setSelectedModel(model);
      setSelectedGeneration('');
   };

   const handleGenerationChange = (generation: string) => {
      setSelectedGeneration(generation);
   };

   return {
      handleGenerationChange,
      handleMakeChange,
      handleModelChange,
      localMakes,
      localModels,
      localGenerations,
      isLoading,
   };
};
