// next

// @mui
import { styled } from '@mui/material/styles';
import { Button, Typography, Container, Link } from '@mui/material';
// layouts
import Layout from '../layouts';
// components
import Page from '../components/Page';
//
import { MaintenanceIllustration } from '../assets';
import React from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10),
}));

// ----------------------------------------------------------------------

Maintenance.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout variant="logoOnly">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function Maintenance() {
  return (
    <Page title="Maintenance" sx={{ height: 1 }}>
      <RootStyle>
        <Container sx={{ textAlign: 'center' }}>
          <Typography variant="h3" paragraph>
            Website currently under maintenance
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>We are currently working hard on this page!</Typography>

          <MaintenanceIllustration sx={{ my: 10, height: 240 }} />

          <Link href="/">
            <Button size="large" variant="contained">
              Go to Home
            </Button>
          </Link>
        </Container>
      </RootStyle>
    </Page>
  );
}
