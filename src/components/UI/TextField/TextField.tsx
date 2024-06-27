import { ChangeEvent, ReactNode, useId, useRef } from 'react';
import cl from './TextField.module.scss';
import {
   ControllerRenderProps,
   FieldErrors,
   FieldValues,
   Path,
} from 'react-hook-form';

export type TFieldType = 'input' | 'textarea';

interface Props<TFieldValues extends FieldValues> {
   title: string;
   field?: ControllerRenderProps<TFieldValues>;
   errors?: FieldErrors<TFieldValues>;
   name?: Path<TFieldValues>;
   value?: string;
   type: TFieldType;
   disabled?: boolean;
   inputType?: 'number' | 'text';
   onChange?: (
      e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>,
   ) => void;
   styles?: {
      width: string;
      height: string;
   };
}

export function TextField<TFieldValues extends FieldValues>({
   title,
   field,
   errors,
   value,
   name,
   onChange,
   type,
   styles,
   inputType,
   disabled,
}: Props<TFieldValues>) {
   const id = useId();

   const labelEl = useRef<HTMLLabelElement | null>(null);

   return (
      <div className={cl.container}>
         <label
            className={[
               cl.label,
               errors && errors[name]?.message ? cl.error : '',
            ].join(' ')}
            htmlFor={id}
            ref={labelEl}
         >
            {errors && errors[name]?.message
               ? (errors[name]?.message as ReactNode)
               : title}
         </label>
         {type === 'input' ? (
            <input
               className={cl.input}
               id={id}
               onChange={field ? field.onChange : onChange}
               value={field ? field.value : value}
               type={inputType ? inputType : 'text'}
               title={title}
               placeholder={title}
               style={styles}
               disabled={disabled}
               // aria-invalid={errors && name && errors[name] ? 'true' : 'false'}
            />
         ) : (
            <textarea
               className={cl.input}
               id={id}
               onChange={field ? field.onChange : onChange}
               value={field ? field.value : value}
               title={title}
               placeholder={title}
               style={styles}
               // aria-invalid={errors && name && errors[name] ? 'true' : 'false'}
            />
         )}
      </div>
   );
}
