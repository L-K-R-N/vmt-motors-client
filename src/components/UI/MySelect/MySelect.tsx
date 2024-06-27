import Select from 'react-select/creatable';
import cl from './MySelect.module.scss';
import { GroupBase, OptionsOrGroups, StylesConfig } from 'react-select';
import {
   ControllerRenderProps,
   FieldErrors,
   FieldPath,
   FieldValues,
   Path,
} from 'react-hook-form';
import { ReactNode, useId, useRef } from 'react';
import { title } from 'process';

const SelectStyles: StylesConfig = {
   control: (styles) => ({
      ...styles,
      padding: '8px 13px',
      borderRadius: '5px',
      background: 'transparent',
      // outline: state.isFocused ? 'none' : 'none',
      color: 'var(--text-primary)',
      fontSize: '16px',
      fontWeight: '300',
      transition: '0.3s',
      // boxShadow: '-3px 3px 3px 0 rgba(0, 0, 0, 0.308)',
      border: '1px solid var(--text-primary)',
      cursor: 'text',
      fontFamily: 'Tilda Sans',
      ':disabled': {
         opacity: 0.5,
         background: 'transparent',
         border: 'var(--text-primary)',
      },
      ':hover': {
         ...styles[':hover'],
         borderColor: 'var(--text-primary)',
      },
   }),
   valueContainer: (styles) => ({
      ...styles,
      padding: '0',
      fontSize: '16px',
      textTransform: 'capitalize',
      gap: '5px',
   }),
   placeholder: (styles) => ({
      ...styles,
      color: 'var(--text-primary)',
      opacity: 0.85,
      fontSize: '16px',
      padding: 0,
      margin: 0,
      transition: '0.3s',
      textOverflow: 'ellipsis',
      // textWrap: 'nowrap',
      ':hover': {
         ...styles[':hover'],
         opacity: 1,
      },
   }),
   input: (styles) => ({
      ...styles,
      padding: 0,
      margin: 0,
      color: 'black',
      textOverflow: 'ellipsis',
      // textWrap: 'nowrap',
      ':disabled': {
         opacity: 0.5,
      },
   }),
   menu: (styles) => ({
      ...styles,
      background: 'var(--background-primary)',
      borderRadius: '5px',
      color: 'black',
      fontWeight: 300,
      overflow: 'hidden',
      fontSize: '16px',
      fontFamily: 'Tilda Sans',
      padding: 0,
      scrollbarColor: 'red',
   }),
   option: (styles) => ({
      ...styles,
      background: 'var(--background-primary)',
      color: 'var(--text-primary)',

      cursor: 'pointer',
      fontSize: '16px',
      opacity: 0.8,
      textTransform: 'capitalize',
      fontFamily: 'Tilda Sans',
      borderBottom: '1px solid #4646462a',
      margin: 0,

      transform: '0.2s',
      ':hover': {
         ...styles[':hover'],
         opacity: 1,
      },
   }),
   singleValue: (styles) => ({
      ...styles,

      color: 'var(--text-primary)',
   }),

   multiValue: (styles) => ({
      ...styles,
      background: '#90C795',
      borderRadius: '999px',
      color: 'var(--text-primary)',
   }),
   multiValueLabel: (styles) => ({
      ...styles,
      color: 'var(--text-primary)',
      padding: 0,
      margin: '3px 12px',
      cursor: 'pointer',
   }),
   multiValueRemove: (styles) => ({
      ...styles,
      color: '#000000',
      cursor: 'pointer',
      background: 'white',
      borderRadius: '999px',
      opacity: '0.8',

      ':hover': {
         ...styles[':hover'],
         opacity: 1,
         color: '#90C795',
         background: 'white',
      },
   }),
   clearIndicator: (styles) => ({
      ...styles,
      cursor: 'pointer',
      color: 'var(--text-primary)',
      opacity: 0.4,
      transition: '0.3s',
      padding: 0,
      paddingLeft: '5px',
      ':hover': {
         ...styles[':hover'],
         opacity: 0.6,
         color: 'var(--text-primary)',
      },
   }),

   dropdownIndicator: (styles) => ({
      ...styles,
      cursor: 'pointer',
      color: 'var(--text-primary)',
      opacity: 0.4,
      transition: '0.3s',
      padding: 0,
      paddingLeft: '5px',
      ':hover': {
         ...styles[':hover'],
         opacity: 0.6,
         color: 'var(--text-primary)',
      },
   }),
};

interface Props<
   TFieldValues extends FieldValues,
   TName extends FieldPath<TFieldValues>,
> {
   placeholder: string;
   isMulti: boolean;
   options: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined;
   field?: ControllerRenderProps<TFieldValues, TName>;
   errors?: FieldErrors<TFieldValues>;
   name?: Path<TFieldValues>;
   handleChange?: (value: string) => void;
   disabled?: boolean;
}

export function MySelect<
   TFieldValues extends FieldValues,
   TName extends FieldPath<TFieldValues>,
>({
   placeholder,
   isMulti,
   field,
   options,
   disabled,
   errors,
   handleChange,
   name,
}: Props<TFieldValues, TName>) {
   const id = useId();

   const labelEl = useRef<HTMLLabelElement | null>(null);
   return (
      <div className={cl.controller}>
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
               : placeholder}
         </label>
         <Select
            styles={SelectStyles}
            placeholder={placeholder}
            isMulti={isMulti}
            {...field}
            options={options}
            value={field?.value}
            isDisabled={disabled}
            isClearable={true}
            onChange={(newValue) => {
               field?.onChange(newValue);

               if (handleChange && field?.value) {
                  handleChange(field.value);
                  console.log(field.value);
               }
            }}
         />
      </div>
   );
}
