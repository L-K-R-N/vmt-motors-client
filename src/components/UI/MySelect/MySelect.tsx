import Select from 'react-select/creatable';
import { GroupBase, OptionsOrGroups, StylesConfig } from 'react-select';
import {
   ControllerRenderProps,
   FieldErrors,
   FieldPath,
   FieldValues,
   Path,
} from 'react-hook-form';
import { IOption } from '@/models/Select.types';

const SelectStyles: StylesConfig = {
   control: (styles) => ({
      ...styles,
      padding: '8px 13px',
      borderRadius: '5px',
      // outline: state.isFocused ? 'none' : 'none',
      color: '#888686',
      fontSize: '16px',
      fontWeight: '400',
      transition: '0.3s',
      // boxShadow: '-3px 3px 3px 0 rgba(0, 0, 0, 0.308)',
      border: '1px solid black',
      cursor: 'text',
      fontFamily: 'Tilda Sans',

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
      color: '#888686',
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
   }),
   menu: (styles) => ({
      ...styles,
      background: '#ffffff',
      borderRadius: '5px',
      color: 'black',
      fontWeight: 400,
      // overflow: 'hidden',
      fontSize: '16px',
      fontFamily: 'Tilda Sans',
      padding: 0,
      scrollbarColor: 'red',
   }),
   option: (styles) => ({
      ...styles,
      background: '#ffffff',
      color: 'black',

      cursor: 'pointer',
      fontSize: '16px',
      opacity: 0.8,

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
      opacity: 0.4,
      transition: '0.3s',
      padding: 0,
      paddingLeft: '5px',
      ':hover': {
         ...styles[':hover'],
         opacity: 0.6,
         color: 'black',
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
}

export function MySelect<
   TFieldValues extends FieldValues,
   TName extends FieldPath<TFieldValues>,
>({
   placeholder,
   isMulti,
   field,
   options,
   handleChange,
}: Props<TFieldValues, TName>) {
   return (
      <Select
         styles={SelectStyles}
         placeholder={placeholder}
         isMulti={isMulti}
         {...field}
         options={options}
         value={field?.value}
         onChange={(newValue) => {
            field?.onChange(newValue);

            // if (handleChange) {
            //    handleChange(field.value);
            //    console.log(field.value);
            // }
         }}
      />
   );
}
