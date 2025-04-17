// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps } from '@mui/material';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

type RHFSelectPropTypes = {
  children?: ReactNode;
  name?: string;
  multiple?:boolean 
} & TextFieldProps;

export default function RHFSelect({ name, children,multiple, ...other }: RHFSelectPropTypes) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
          SelectProps={{ native: true, multiple }}
          error={!!error}
          helperText={error?.message}
          {...other}
        >
          {children}
        </TextField>
      )}
    />
  );
}
