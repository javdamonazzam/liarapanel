import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Card, Checkbox, Grid, ListItemText, MenuItem, OutlinedInput, Select, Stack } from '@mui/material';
// components
import { FormProvider, RHFSelect, RHFTextField } from '@/components/hook-form';
import toast from 'react-hot-toast';
import useEditProduct from '@/react-query/product/useEditProduct.ts';
import useCreateServer from '@/react-query/product/useCreateProduct.ts';
import useFetchSeler from '@/react-query/factors/useFetchFactors';
import { translateSevice } from '@/utils/translateService';
import { service_typeEnum } from '@/types/enums/role.enum.ts';
// ----------------------------------------------------------------------

type PharmacyNewEditPropsType = {
  isEdit?: boolean;
  currentProduct?: Product;
};
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export default function ProductNewEdit({ isEdit = false, currentProduct }: PharmacyNewEditPropsType) {
  
  const { push } = useRouter();
  const { data: user, isLoading } = useFetchSeler();
  console.log(user?.result)
  const [users, setusers] = useState<User[]>([]);

  const handleChange = (event: any) => {
    const {
      target: { value },
    } = event;
    setusers(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',').map(Number) : value
    );
  };
  const NewProductSchema = Yup.object().shape({
    title: Yup.string().required('نام سرور اجباری است'),
    damein: Yup.string().required('دامنه سرور اجباری است'),
    ip: Yup.string().required('ip سرور اجباری است'),
    port: Yup.number().required('پورت سرور اجباری است'),
    max_user: Yup.number().optional(),
  });

  const defaultValues = useMemo<Partial<Product>>(
    () => ({
      title: currentProduct?.title || '',
      damein: currentProduct?.damein || '',
      service_type: currentProduct?.service_type || service_typeEnum.WIRE,
      ip: currentProduct?.ip || 0,
      port: currentProduct?.port || 0,
      max_user: currentProduct?.max_user || 130,
    }),
    [currentProduct]
  );

  const methods = useForm({
    resolver: yupResolver(NewProductSchema),
    defaultValues,
  });

  const { reset, handleSubmit, setError, control } = methods;
  const { mutate: createُServer, isPending: isCreatePending, error: errorCreate } = useCreateServer();
  const { mutate: updateProduct, isPending: isUpdatePending, error: errorUpdate } = useEditProduct();

  useEffect(() => {
    const e = errorCreate || errorUpdate;
    if (e) {
      if (typeof e.errorData === 'string') toast.error(e.errorData);
      if (typeof e.errorData === 'object') {
        for (let key in e.errorData) {
          console.log('KEY<<<<<<<<', key);
          if (Array.isArray(key)) {
            for (let i = 0; i < e.errorData[key].length; i++) {
              console.log(`${key}[${i}].${key[i]}`);
              setError(`${key}[${i}].${key[i]}` as keyof Product, { message: e.errorData[key][0] });
            }
            continue;
          }
          setError(key as keyof Product, { message: e.errorData[key] });
        }
      }
    }
  }, [errorCreate, errorUpdate]);
  const onSubmit = async (data: Partial<Product>) => {
    if (isEdit) {
      updateProduct({ id: currentProduct?.id, data });
    } else {
      const dataa=users.map(id => ({id:id}))
      const finaldata = { ...data , users: dataa.map(data => ({ id: data.id })),}
      createُServer(finaldata);
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
              <RHFTextField name="title" label="نام سرور" />
              <RHFTextField name="damein" label="دامنه سرور" />
              <RHFTextField name="ip" label="ip سرور" />
              <RHFTextField name="port" label="پورت سرور" />
              <RHFTextField name="max_user" label="حداکثر کاربر" />
              <RHFSelect name="service_type" label="نوع سرویس" placeholder="یک سرویس انتخاب کنید" >
                {[service_typeEnum.WIRE, service_typeEnum.OPENVPN]?.map((serviceType) => (
                  <option key={serviceType} value={serviceType}>
                    {translateSevice[serviceType]}
                  </option>
                ))}
              </RHFSelect>
              <Select
                labelId="demo-multiple-checkbox-label"
                id="demo-multiple-checkbox"
                multiple
                value={users}
                onChange={handleChange}
                input={<OutlinedInput label="Tag" />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
              >
                {user?.result .map((name) => (
                  <MenuItem key={name.username} value={name.id}>
                    <span>{name.username}</span>
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="outlined" loading={isUpdatePending || isCreatePending}>
                {!isEdit ? 'ساخت سرور' : 'ذخیره تغییرات'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
