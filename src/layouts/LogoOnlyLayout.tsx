// @mui
import { styled } from '@mui/material/styles';
// components
import Logo from '../components/Logo';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0),
  },
}));

// ----------------------------------------------------------------------

type propsType = {
  children: ReactNode;
};

export default function LogoOnlyLayout({ children }: propsType) {
  return (
    <>
      <HeaderStyle>
        <Logo />
      </HeaderStyle>
      {children}
    </>
  );
}
