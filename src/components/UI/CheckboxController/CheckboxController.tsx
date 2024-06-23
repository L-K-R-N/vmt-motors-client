import {
   Control,
   Controller,
   FieldErrors,
   FieldValues,
   UseControllerProps,
} from 'react-hook-form';
import cl from './CheckboxController.module.scss';
import { TextField, TFieldType } from '../TextField/TextField';
import { ReactNode } from 'react';

interface Props<TFieldValues extends FieldValues>
   extends UseControllerProps<TFieldValues> {
   disabled?: boolean;
   label: string;
   placeholder?: string;
   errors: FieldErrors<TFieldValues>;
   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   control: Control<TFieldValues, any>;
   fieldType: TFieldType;
   styles?: {
      width: string;
      height: string;
   };
}

export function CheckboxController<TFieldValues extends FieldValues>({
   name,
   control,
   defaultValue,
   errors,
   rules,
   label,
   styles,
   disabled,
}: Props<TFieldValues>) {
   return (
      <div className={cl.container}>
         <Controller
            name={name}
            control={control}
            rules={rules}
            defaultValue={defaultValue}
            render={({ field }) => (
               <div className={cl.label}>
                  {label}
                  <input
                     title={label}
                     type="checkbox"
                     value={field.value}
                     onChange={() => field.onChange(!field.value)}
                     className={[cl.checkbox, cl.checked].join(' ')}
                     disabled={disabled}
                  />
               </div>

               // <TextField
               //    type={fieldType}
               //    errors={errors}
               //    title={label}
               //    field={field}
               //    name={name}
               //    styles={styles}
               //    disabled={disabled}
               // />
            )}
         />
         {/* {errors && <span>{errors[name]?.message as ReactNode}</span>} */}
      </div>
   );
}
