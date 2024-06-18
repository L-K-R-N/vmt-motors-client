import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import DatePicker from 'react-date-picker';
import { INote } from '@/models/Project.types';
import { Modal } from '@/components/UI/Modal';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { Form } from '../Form/Form';
import { Button } from '@/components/UI/Button/Button';
import { SelectController } from '@/components/UI/SelectController/SelectController';
import { useState } from 'react';
import { IProduct } from '@/models/Product.types';
import { setProducts, updateProduct } from '@/store/reducers/ProductsSlice';
import img from './img.jpg';
import { TextFieldController } from '@/components/UI/TextFieldController/TextFieldController';
import { useAppSelector } from '@/hooks/useAppSelector';
interface Props {
   isShow: boolean;
   setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

type IProductInputs = Pick<IProduct, 'name' | 'desc' | 'price'>;
export const AddProductModal: React.FC<Props> = ({ isShow, setShow }) => {
   const dispatch = useAppDispatch();
   const currentDate = new Date();
   const { products } = useAppSelector((state) => state.ProductsReducer);
   // const [sortingOptions, setSortingOptions] = useState<IOption<string>[]>(options)

   // const onChangeDate = (date: ) => {
   //     const dateValue = date.toDate()
   // }
   const [taskNotes, setTaskNotes] = useState<INote[]>([]);
   const {
      handleSubmit,
      control,
      reset,
      setValue,
      formState: { errors },
   } = useForm<IProductInputs>();

   const onSubmit: SubmitHandler<IProductInputs> = (data) => {
      const id = Date.now();

      dispatch(
         setProducts([
            ...products,
            {
               id: id,
               desc: data.desc,
               name: data.name,
               price: data.price,
               countInCart: 1,
               img: img,
               inCart: false,
               rating: 5,
            },
         ]),
      );

      // console.log(project.tasks)
      reset();
      setValue('name', '');
      setValue('desc', '');
      setShow(false);
   };

   // const handleChangeNotes = (newValue: SingleValue<IOption<string>>) => {
   //     dispatch(setSorting(newValue?.value === 'desc' ||
   //                         newValue?.value === 'title' ||
   //                         newValue?.value === 'id' ? newValue?.value : sortingBy))
   //     // console.log(sortingBy)
   // }

   return (
      <Modal title="Добавление товара" setShow={setShow} isShow={isShow}>
         <Form onSubmit={handleSubmit(onSubmit)}>
            <TextFieldController
               control={control}
               errors={errors}
               label="Введите название"
               name="name"
               fieldType="input"
               rules={{ required: 'Введите почту' }}
            />
            <TextFieldController
               control={control}
               errors={errors}
               label="Введите описание"
               name="desc"
               fieldType="input"
               rules={{ required: 'Введите почту' }}
            />
            <TextFieldController
               control={control}
               errors={errors}
               label="Введите цену"
               name="price"
               fieldType="input"
               rules={{ required: 'Введите почту' }}
            />

            <Button type="submit" title="Создать задачу">
               Создать
            </Button>
         </Form>
      </Modal>
   );
};
