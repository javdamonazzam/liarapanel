import { useSnackbar } from 'notistack';
import { useState } from 'react';
// next

import { useRouter } from 'next/router';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, Stack, MenuItem } from '@mui/material';
// routes
import { PATH_DASHBOARD, PATH_AUTH } from '@routes/paths.tsx';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import MyAvatar from '../../../components/MyAvatar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';
import Link from '@components/Link.tsx';
import { useWalletStore } from '@/zustand/users/wallet';

// formatNumber
import { fCurrency } from '@utils/formatNumber.tsx';
import { useFetchWallet } from '@/react-query/user/useFetchUsers';
// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'داشبورد',
    linkTo: '/',
  },
  {
    label: 'حساب کاربری',
  },
];
// ----------------------------------------------------------------------
export default function AccountPopover() {
  const router = useRouter();
  const { balance_wallet } = useWalletStore();
  const {  logout } = useAuth();
 
  const isMountedRef = useIsMountedRef();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {
    try {
      await logout();
      router.replace(PATH_AUTH.login);

      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.2),
            },
          }),
        }}
      >
        <div className="text-pretty">
          <h3 style={{ fontSize: '20px', paddingTop: '15px', paddingLeft: '20px' }}>موجودی </h3>
          {/* <span style={{fontSize:'15px', paddingLeft:'5px'}}>{wallet?.result?.wallet_balance}</span> */}
          <span style={{ fontSize: '15px' }}>{fCurrency(balance_wallet) || '-'} تومان </span>
        </div>
        <MyAvatar />
      </IconButtonAnimate>
      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap></Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {/* {user?.phone_number} */}
          </Typography>
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <Link key={option.label} href={option.linkTo}>
              <MenuItem key={option.label} onClick={handleClose}>
                {option.label}
              </MenuItem>
            </Link>
          ))}
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          خروج
        </MenuItem>
      </MenuPopover>
    </>
  );
}
