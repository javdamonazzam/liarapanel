import { useFormContext, Controller, ControllerProps } from 'react-hook-form';
// @mui
import { TextField } from '@mui/material';
import { TextFieldProps } from '@mui/material/TextField/TextField';

// ----------------------------------------------------------------------

type RHFTextFieldPropTypes = {
  name: string; // Required since it's essential for form control
  label?: string;
} & Partial<ControllerProps> &
  Partial<TextFieldProps>;

export default function RHFNumField({ name, label, ...other }: RHFTextFieldPropTypes) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          label={label} // Ensuring the label is passed correctly
          type="number" // Set input type to number
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} // Optional: further restrict input to numeric
          {...other}
        />
      )}
    />
  );
}
