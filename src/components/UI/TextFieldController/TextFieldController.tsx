import {
   Control,
   Controller,
   FieldErrors,
   FieldValues,
   UseControllerProps,
} from 'react-hook-form';
import cl from './TextFieldController.module.scss';
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
   inputType?: 'number' | 'text';
   styles?: {
      width: string;
      height: string;
   };
}

export function TextFieldController<TFieldValues extends FieldValues>({
   name,
   control,
   defaultValue,
   errors,
   rules,
   label,
   fieldType,
   styles,
   inputType,
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
               <TextField
                  type={fieldType}
                  errors={errors}
                  title={label}
                  field={field}
                  name={name}
                  styles={styles}
                  inputType={inputType}
                  disabled={disabled}
               />
            )}
         />
         {/* {errors && <span>{errors[name]?.message as ReactNode}</span>} */}
      </div>
   );
}
