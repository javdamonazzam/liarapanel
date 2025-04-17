import * as Yup from 'yup';
import { useEffect, useMemo } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack } from '@mui/material';
// components
import { FormProvider, RHFTextField } from '@/components/hook-form';
import toast from 'react-hot-toast';
import useEditSupport from '@/react-query/support/useEditSupport.ts';
import useCreateSupport from '@/react-query/support/useCreateSupport.ts';
import RHFNumField from '@/components/hook-form/RHFNumField';

// ----------------------------------------------------------------------

type SupportNewEditProps = {
  isEdit?: boolean;
  currentSupport?: Support;
};

export default function SupportNewEdit({ isEdit = false, currentSupport }: SupportNewEditProps) {
  const { push } = useRouter();

  const NewSupportSchema = Yup.object().shape({
    username: Yup.string().required('نام سرویس اجباری است'),
    account_price: Yup.number().required('قیمت سرویس اجباری است'),
    password: Yup.string().required('پسورد اجباری است'),
  });

  const defaultValues = useMemo<Partial<Support>>(
    () => ({
      username: currentSupport?.username || '',
      password: currentSupport?.password || '',
      account_price: currentSupport?.account_price ,
      // offer_price: currentSupport?.offer_price || 0,
      // duration: currentSupport?.duration || 0,
      // final_price: currentSupport?.final_price || 0,
    }),
    [currentSupport]
  );

  const methods = useForm({
    resolver: yupResolver(NewSupportSchema),
    defaultValues,
  });

  const { reset, handleSubmit, setError, control } = methods;
  const { mutate: createSupport, isPending: isCreatePending, error: errorCreate } = useCreateSupport();
  const { mutate: updateSupport, isPending: isUpdatePending, error: errorUpdate } = useEditSupport();

  useEffect(() => {
    const e = errorCreate || errorUpdate;
    if (e) {
      if (typeof e.errorData === 'string') toast.error(e.errorData);
      if (typeof e.errorData === 'object') {
        for (let key in e.errorData) {
          setError(key as keyof Support, { message: e.errorData[key] });
        }
      }
    }
  }, [errorCreate, errorUpdate]);
  const onSubmit = async (data: Partial<Support>) => {
    console.log('Data', data);

    if (isEdit) {
      updateSupport({ id: currentSupport?.id, data });
    } else {
      
      createSupport(data);
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="username" label="ایمیل" />
              <RHFTextField name="password" label="پسورد" />
              <RHFNumField name="account_price" label="قیمت سرویس" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isUpdatePending || isCreatePending}>
                {!isEdit ? 'ساخت سرویس' : 'ذخیره تغییرات'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
