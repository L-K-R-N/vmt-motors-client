import Select from 'react-select/creatable';
import { GroupBase, OptionsOrGroups, StylesConfig } from 'react-select';
import {
   ControllerRenderProps,
   FieldErrors,
   FieldPath,
   FieldValues,
   Path,
} from 'react-hook-form';
interface Props<
   TFieldValues extends FieldValues,
   TName extends FieldPath<TFieldValues>,
> {
   placeholder: string;
   isMulti: boolean;
   options: OptionsOrGroups<unknown, GroupBase<unknown>> | undefined;
   field: ControllerRenderProps<TFieldValues, TName>;
   errors?: FieldErrors<TFieldValues>;
   name?: Path<TFieldValues>;
}

const SelectStyles: StylesConfig = {
   control: (styles) => ({
      ...styles,
      padding: '12px 30px 10px 16px',
      borderRadius: '16px',
      // outline: state.isFocused ? 'none' : 'none',
      color: '#000000',
      fontSize: '16px',
      fontWeight: '400',
      transition: '0.3s',
      boxShadow: 'none',
      border: '1px solid #cac4c4',
      cursor: 'text',

      ':hover': {
         ...styles[':hover'],
         borderColor: 'black',
      },
   }),
   valueContainer: (styles) => ({
      ...styles,
      padding: '0',
      fontSize: '16px',
      gap: '5px',
   }),
   placeholder: (styles) => ({
      ...styles,
      color: '#969696',
      opacity: 0.65,
      fontSize: '16px',
      padding: 0,
      margin: 0,
   }),
   input: (styles) => ({
      ...styles,
      padding: 0,
      margin: 0,
      color: 'black',
   }),
   menu: (styles) => ({
      ...styles,
      background: '#ffffff',
      borderRadius: '5px',
      color: 'black',
      fontWeight: 400,
   }),
   option: (styles) => ({
      ...styles,
      background: '#ffffff',
      borderRadius: '5px',
      color: 'black',
      cursor: 'pointer',
      ':hover': {
         ...styles[':hover'],
         color: '#2F2F2F',
         background: 'white',
      },
   }),
   singleValue: (styles) => ({
      ...styles,

      color: 'black',
   }),

   multiValue: (styles) => ({
      ...styles,
      background: '#90C795',
      borderRadius: '999px',
      color: 'black',
   }),
   multiValueLabel: (styles) => ({
      ...styles,
      color: 'black',
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
      color: 'black',
      opacity: 0.7,

      ':hover': {
         ...styles[':hover'],
         opacity: 1,
         color: 'white',
      },
   }),
   dropdownIndicator: (styles) => ({
      ...styles,
      cursor: 'pointer',
      color: 'black',
      opacity: 0.7,

      ':hover': {
         ...styles[':hover'],
         opacity: 1,
         color: 'black',
      },
   }),
};

export function MySelect<
   TFieldValues extends FieldValues,
   TName extends FieldPath<TFieldValues>,
>({ placeholder, isMulti, field, options }: Props<TFieldValues, TName>) {
   return (
      <Select
         styles={SelectStyles}
         placeholder={placeholder}
         isMulti={isMulti}
         {...field}
         options={options}
         value={field.value}
         onChange={(newValue) => {
            field.onChange(newValue);
         }}
      />
   );
}
