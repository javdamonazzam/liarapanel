// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
// hooks
import useAuth from '../../hooks/useAuth';
import useSettings from '../../hooks/useSettings';
// layouts
import Layout from '../../layouts';
// components
import Page from '../../components/Page';
// sections
import {
  AppWidget,
  AppNewInvoice,
  AppTopAuthors,
  AppTopRelated,
  AppAreaInstalled,
  AppWidgetSummary,
  AppCurrentDownload,
  AppTopInstalledCountries,
} from '../../sections/@dashboard/general/app';
import React from 'react';

// ----------------------------------------------------------------------

GeneralApp.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function GeneralApp() {

  const theme = useTheme();

  const { themeStretch } = useSettings();

  return (
    <Page title="داشبورد">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {/*<Grid item xs={12} md={8}>*/}
          {/*  <AppWelcome displayName={user?.full_name || ` کاربر شماره${user.id} `} />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} md={4}>*/}
          {/*  <AppFeatured />*/}
          {/*</Grid>*/}

          <Grid item xs={12} md={12}>
            <Box
              sx={{
                backgroundColor: theme.palette.background.default,
                width: '100%',
                height: 300,
                borderRadius: 2,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Typography fontSize={35}> به پنل مدیریت کاربران</Typography>
            </Box>
            {/*<AppWidgetSummary*/}
            {/*  title="Total Active Users"*/}
            {/*  percent={2.6}*/}
            {/*  total={18765}*/}
            {/*  chartColor={theme.palette.primary.main}*/}
            {/*  chartData={[5, 18, 12, 51, 68, 11, 39, 37, 27, 20]}*/}
            {/*/>*/}
          </Grid>

          {/*<Grid item xs={12} md={4}>*/}
          {/*  <AppWidgetSummary*/}
          {/*    title="Total Installed"*/}
          {/*    percent={0.2}*/}
          {/*    total={4876}*/}
          {/*    chartColor={theme.palette['chart'].blue[0]}*/}
          {/*    chartData={[20, 41, 63, 33, 28, 35, 50, 46, 11, 26]}*/}
          {/*  />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} md={4}>*/}
          {/*  <AppWidgetSummary*/}
          {/*    title="Total Downloads"*/}
          {/*    percent={-0.1}*/}
          {/*    total={678}*/}
          {/*    chartColor={theme.palette['chart'].red[0]}*/}
          {/*    chartData={[8, 9, 31, 8, 16, 37, 8, 33, 46, 31]}*/}
          {/*  />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} md={6} lg={4}>*/}
          {/*  <AppCurrentDownload />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} md={6} lg={8}>*/}
          {/*  <AppAreaInstalled />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} lg={8}>*/}
          {/*  <AppNewInvoice />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} md={6} lg={4}>*/}
          {/*  <AppTopRelated />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} md={6} lg={4}>*/}
          {/*  <AppTopInstalledCountries />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} md={6} lg={4}>*/}
          {/*  <AppTopAuthors />*/}
          {/*</Grid>*/}

          {/*<Grid item xs={12} md={6} lg={4}>*/}
          {/*  <Stack spacing={3}>*/}
          {/*    <AppWidget title="Conversion" total={38566} icon={'eva:person-fill'} chartData={48} />*/}
          {/*    <AppWidget title="Applications" total={55566} icon={'eva:email-fill'} color="warning" chartData={75} />*/}
          {/*  </Stack>*/}
          {/*</Grid>*/}
        </Grid>
      </Container>
    </Page>
  );
}
