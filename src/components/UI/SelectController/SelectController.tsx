import {
   Control,
   Controller,
   FieldErrors,
   FieldValues,
   UseControllerProps,
} from 'react-hook-form';
import cl from './SelectController.module.scss';
import { ReactNode } from 'react';
import { MySelect } from '../MySelect/MySelect';
import { GroupBase, OptionsOrGroups } from 'react-select';

interface Props<TFieldValues extends FieldValues, TOptions>
   extends UseControllerProps<TFieldValues> {
   disabled?: boolean;
   placeholder: string;
   errors: FieldErrors<TFieldValues>;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   control: Control<TFieldValues, any, TFieldValues>;
   options: OptionsOrGroups<TOptions, GroupBase<TOptions>> | undefined;
   isMulti: boolean;
   handleChange?: (value: string) => void;
}

export function SelectController<TFieldValues extends FieldValues, TOptions>({
   name,
   control,
   defaultValue,
   errors,
   rules,
   options,
   placeholder,
   isMulti,
   disabled,
   handleChange,
}: Props<TFieldValues, TOptions>) {
   return (
      <div className={[cl.container, errors && name ? cl.error : ''].join(' ')}>
         <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field }) => (
               <MySelect
                  isMulti={isMulti}
                  placeholder={placeholder}
                  field={field}
                  options={options}
                  errors={errors}
                  name={name}
                  disabled={disabled}
                  handleChange={handleChange}
               />
            )}
         />
         {/* {errors && name && <label>{errors[name]?.message as ReactNode}</label>} */}
      </div>
   );
}
