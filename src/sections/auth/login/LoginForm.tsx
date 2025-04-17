import { useState } from 'react';
// form
import { useForm } from 'react-hook-form';
// @mui
import { Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '@/hooks/useAuth';
// components
import { FormProvider, RHFTextField } from '@components/hook-form';
import { useEffect } from 'react';
import { AnimatePresence, m } from 'framer-motion';

export default function LoginForm() {
  const { user,  loginStepTwo } = useAuth();
  const [loading, setloading] = useState(false);
  const methods = useForm<LoginDto>();

  const {
    reset,
    setError,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = methods;

  useEffect(() => {
    console.log(errors);
  }, [errors]);

  const onSubmit = async (data: LoginDto) => {
    try {
      // if (login.data) {
        setloading(true);
        
        await loginStepTwo.mutateAsync({ username: data.username, password: data.password });
      // } else {
      //   await login.mutateAsync({
      //     email: data.email,
      //     password: data.password
      //   });
      // }
      setloading(false)
    } catch (error) {
      // console.error(error);
      reset();
      // toast.error(error.errorData);
      for (let key in error.errorData) {
        setError(key as 'username' | 'password', { message: error.errorData[key] });
      }
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={3}>
        <RHFTextField disabled={loading } name="username" label="ایمیل" />
        <RHFTextField disabled={loading } name="password" label="رمز عبور" />
      </Stack>
      {/* <AnimatePresence>
        {login.data && (
          <m.div initial={{ y: -50 }} animate={{ y: 0 }} exit={{ y: -50 }}>
            <Stack sx={{ marginTop: 3 }} spacing={3}>
              <RHFTextField name="code" label="کد یکبار مصرف" />
            </Stack>
          </m.div>
        )}
      </AnimatePresence> */}

      <LoadingButton
        sx={{ marginTop: 5 }}
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
      >
        ورود
      </LoadingButton>
    </FormProvider>
  );
}
