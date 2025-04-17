// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import DatePicker from '@mui/lab/DatePicker';
import { Stack, TextField, MenuItem, InputAdornment } from '@mui/material';
// components
import { RHFSelect, RHFTextField } from '@/components/hook-form';
import { FactorTypeEnum } from '@/types/enums/factor-type.enum.ts';
import { FactorStatusEnum } from '@/types/enums/factor-status.enum.ts';
import { useState } from 'react';
import useFetchSeler from '@/react-query/factors/useFetchFactors';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { label: 'در انتظار پرداخت', value: FactorStatusEnum.PENDING },
  { label: 'پرداخت شده', value: FactorStatusEnum.PAID },
  { label: 'پرداخت نشده', value: FactorStatusEnum.UNPAID },
];

// ----------------------------------------------------------------------

export default function InvoiceNewEditStatusDate() {
  // const [price ,setpriceValue]=useState(10)
  const { data: user, isLoading } = useFetchSeler();
console.log(user?.result)
  return (
    <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ p: 3, bgcolor: 'background.default' }}>
      <RHFSelect
        fullWidth
        name="status"
        label="وضعیت"
        InputLabelProps={{ shrink: true }}
        SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
      >
        {STATUS_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            value={option.value}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option.label}
          </MenuItem>
        ))}
      </RHFSelect>
      <RHFSelect
        fullWidth
        name="user_id"
        label="کاربر"
        disabled={isLoading}
        InputLabelProps={{ shrink: true }}
        SelectProps={{ native: false, sx: { textTransform: 'capitalize' } }}
      >
        <MenuItem
          value={' '}
          sx={{
            mx: 1,
            my: 0.5,
            borderRadius: 0.75,
            typography: 'body2',
            textTransform: 'capitalize',
          }}
        >
          {'انتخاب کنید'}
        </MenuItem>
        {user?.result?.map((option) => (
          <MenuItem
            key={option.id}
            value={option.id}
            sx={{
              mx: 1,
              my: 0.5,
              borderRadius: 0.75,
              typography: 'body2',
              textTransform: 'capitalize',
            }}
          >
            {option.username}
          </MenuItem>
        ))}
      </RHFSelect>
      <RHFTextField
        size="small"
        type="number"
        name='price'
        label="شارژ(تومان)"
        sx={{ height: '55px', maxHeight: '100%' }}
        InputProps={{
          sx: (theme) => ({
            '& input': {
              height: '40px',
              maxHeight: '100%',
            },
          }),
          startAdornment: <InputAdornment position="start"></InputAdornment>,
        }}
      />
    </Stack>
  );
}
