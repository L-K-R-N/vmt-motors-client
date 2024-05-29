import { ChangeEvent, useState } from 'react';
import cl from './FilterForm.module.scss';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { setSearch } from '@/store/reducers/ProductsSlice';
import { FilterModal } from '@/components/modals/FilterModal/FilterModal';
import searchIco from './assets/search.svg';
import { Input } from '@/components/UI/TextField/TextField';
import { Button } from '@/components/UI/Button/Button';
import { IoSearch } from 'react-icons/io5';
import { CiSearch } from 'react-icons/ci';
import { FiSearch } from 'react-icons/fi';
interface Props {}

export const FilterForm: React.FC<Props> = () => {
   const [showFilter, setShowFilter] = useState(false);
   const { search } = useAppSelector((state) => state.FilterReducer);
   const dispatch = useAppDispatch();

   const handleSearchInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(setSearch(e.target.value));
   };

   return (
      <div className={cl.form}>
         <div className={cl.inputContainer}>
            <Input
               title="Введите название"
               value={search}
               onChange={handleSearchInputChange}
            />
            <FiSearch className={cl.inputIco} />
         </div>
         <Button
            title="Сортировка проектов"
            type="button"
            onClick={() => setShowFilter(true)}
         >
            Фильтры
         </Button>
         <FilterModal isShow={showFilter} setShow={setShowFilter} />
      </div>
   );
};
