import * as Yup from 'yup';
import { useEffect, useMemo, useState } from 'react';
// next
import { useRouter } from 'next/router';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { LoadingButton } from '@mui/lab';
import { Box, Button, Card, Grid, Stack } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '@routes/paths.tsx';
// components
import { FormProvider, RHFSelect, RHFTextField } from '@/components/hook-form';
import useFetchPharmacies from '@/react-query/pharmacy/useFetchPharmacies.ts';
// import useCreateUser from '@/react-query/user/useCreateUser.ts';
import toast from 'react-hot-toast';
import { RoleEnum } from '@/enums/role.enum.ts';
import useUpdateUser from '@/react-query/user/useUpdateUser';
import { UserStatusEnum } from '@/types/enums/user-status.enum';
import { ROLE_TRANSLATE, USER_STATUS_TRANSLATE } from '@locales/enumTranslate.ts';
import useModalManager from '@/zustand/utils/useModalManager.ts';
import { service_typeEnum } from '@/types/enums/role.enum.ts';
import { translateSevice } from '@/utils/translateService';
import { FaPlus, FaMinus } from 'react-icons/fa6';
import { Input } from '@mui/material';
import { padding } from '@mui/system';
import { useCounterStore } from '@/zustand/users/counter';
import { useCreateAccount, useFindIp } from '@/react-query/user/useCreateUser.ts';
import { FcAlarmClock } from "react-icons/fc";
// ----------------------------------------------------------------------

type UserNewEditFormPropTypes = {
  isEdit?: boolean;
  currentUser?: any;
  pharmacyId?: number;
};

export default function UserNewEditForm({ isEdit = false, currentUser, pharmacyId }: UserNewEditFormPropTypes) {
  const [type, setType] = useState('');
  const { value, increment, decrement, setValue } = useCounterStore();
  const { data: ipdata, isLoading } = useFindIp();
  const newdata = ipdata;
  const { push } = useRouter();
  const NewUserSchema = Yup.object().shape({
    title: Yup.string().required('نام اجباری است'),
  });

  const defaultValues = useMemo(
    () => ({
      title: currentUser?.title || '',
      server_id: currentUser?.id || '',
    }),
    [currentUser]
  );
  const methods = useForm({
    resolver: yupResolver(NewUserSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
    watch,
  } = methods;
  // console.log(watch("service_type"));

  const closeModal = useModalManager((state) => state.closeModal);

  const { mutateAsync: createUser } = useCreateAccount();
  const { mutateAsync: updateUser } = useUpdateUser();
  useEffect(() => {
    console.log(currentUser);
    if (!isEdit) {
      reset(defaultValues);
    }
  }, [isEdit, currentUser]);

  const onSubmit = async (data: Partial<User>) => {
    // return
    try {
      if (isEdit) {
        // await updateUser({ id: currentUser?.id, body: data });
      } else {
        const account = await createUser(data);
      }
      reset();

      toast.success(!isEdit ? 'کاربر با موفقیت ساخته شد!' : 'اطلاعات کاربر با موفقیت تغییر کرد!');
      // if (!pharmacyId) {
      //   push(PATH_DASHBOARD.user.list);
      // }
    } catch (e) {
      console.error(e);
      if (typeof e.errorData === 'string') toast.error(e.errorData);
      if (typeof e.errorData === 'object') {
        for (let key in e.errorData) {
          setError('title', { message: e.errorData[key] });
        }
      }
    }
  };
  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card sx={{ p: 3 }}>
            <Box
              sx={{
                display: 'grid',
                columnGap: 2,
                rowGap: 3,
                gridTemplateColumns: { xs: 'repeat(1, 1fr)', sm: 'repeat(2, 1fr)' },
              }}
            >
              <RHFTextField name="title" label="عنوان کانفیگ" />

              <RHFSelect name="server_id" label="نوع ip" placeholder="یک ip انتخاب کنید">
                {/* <option></option> */}
                <option></option>
                {ipdata?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.service_type}({item.ip})
                  </option>
                ))}
              </RHFSelect>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Button onClick={increment} color="inherit">
                  <Box pt={1} sx={{ borderRadius: '60%', bgcolor: 'text.disabled', height: 40 }}>
                    <FaPlus size={25} />
                  </Box>
                </Button>
                <div style={{ paddingTop: '10px', fontWeight: 'bold', fontSize: '34px' }}>
                  <span style={{color:'darkcyan'}}>{value}</span><span style={{color:'GrayText'}}>ماه</span>
                </div>
                <Button onClick={decrement} color="inherit">
                  <Box pt={1} sx={{ borderRadius: '60%', bgcolor: 'text.disabled', height: 40 }}>
                    <FaMinus size={25} />
                  </Box>
                </Button>
              </Box>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                {!isEdit ? 'ساخت کاربر' : 'ذخیره تغییرات'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}
