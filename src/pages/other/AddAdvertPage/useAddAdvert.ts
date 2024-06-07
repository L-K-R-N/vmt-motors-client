import { useMemo, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/useAppDispatch.js';
import { register, setIsAuth } from '@/store/reducers/AuthSlice.js';
import { useAppSelector } from '@/hooks/useAppSelector';

export interface IAddInputs {
   brand: string;
   year: number;
   type: string;
   mileage: number;
   body:
      | 'coupe'
      | 'universal'
      | 'hatchaback'
      | 'roadster'
      | 'liftback'
      | 'crossover';
   photo: string;
   generation: string;
   engine: 'gasoline' | 'diesel' | 'hybrid';
   drive: 'front' | 'rear' | 'all';
   color: string;
   coloring: string;
   desc: string;
   price: number;
}
export interface IBody {
   name: string;
   img: string;
}

export const useAddAdvert = () => {
   const {
      handleSubmit,
      formState: { errors },
      control,
   } = useForm<IAddInputs>({
      mode: 'onChange',
   });
   const navigate = useNavigate();
   const dispatch = useAppDispatch();
   const [selectedBody, setSelectedBody] = useState<IBody | null>(null);

   const onSubmit: SubmitHandler<IAddInputs> = (data) => {
      try {
      } catch (e) {
         console.log(e);
      }
   };

   return useMemo(
      () => ({
         errors,
         onSubmit,
         control,
         handleSubmit,
         setSelectedBody,
      }),
      [errors],
   );
};
