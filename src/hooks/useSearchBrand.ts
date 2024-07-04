import { ISelectItem } from '@/api/models/Products';
import { useMemo, useState } from 'react';

export const useSearchBrand = (brands: ISelectItem<string>[]) => {
   const [search, setSearch] = useState('');
   const [filteredBrands, setFilteredBrands] =
      useState<ISelectItem<string>[]>(brands);

   const handleSearch = (term: string) => {
      setSearch(term);
      filterItems(term);
   };

   const filterItems = useMemo(
      () => (term: string) => {
         if (!term) {
            setFilteredBrands(brands);
            return;
         }

         const filtered = brands.filter((brand) =>
            brand.value.toLowerCase().includes(term.toLowerCase()),
         );
         setFilteredBrands(filtered);
      },
      [brands],
   );

   return { search, filteredBrands, handleSearch };
};
