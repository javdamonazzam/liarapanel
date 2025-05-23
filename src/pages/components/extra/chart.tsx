// @mui
import { styled } from '@mui/material/styles';
import { Box, Card, Grid, Container, CardHeader, CardContent } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import {
  ChartPie,
  ChartBar,
  ChartLine,
  ChartArea,
  ChartMixed,
  ChartDonut,
  ChartsRadarBar,
  ChartRadialBar,
  ChartColumnSingle,
  ChartColumnStacked,
  ChartColumnNegative,
  ChartColumnMultiple,
} from '../../../sections/overview/extra/chart';
import React from 'react';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

DemoCharts.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function DemoCharts() {
  return (
    <Page title="Components: Charts">
      <RootStyle>
        <Box
          sx={{
            pt: 6,
            pb: 1,
            mb: 10,
            bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800'),
          }}
        >
          <Container>
            <HeaderBreadcrumbs
              heading="Charts"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Charts' }]}
              moreLink="https://apexcharts.com"
            />
          </Container>
        </Box>

        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Card dir="ltr">
                <CardHeader title="Area" />
                <CardContent>
                  <ChartArea />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card dir="ltr">
                <CardHeader title="Line" />
                <CardContent>
                  <ChartLine />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card dir="ltr">
                <CardHeader title="Column Single" />
                <CardContent>
                  <ChartColumnSingle />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card dir="ltr">
                <CardHeader title="Column Multiple" />
                <CardContent>
                  <ChartColumnMultiple />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card dir="ltr">
                <CardHeader title="Column Stacked" />
                <CardContent>
                  <ChartColumnStacked />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card dir="ltr">
                <CardHeader title="Column Negative" />
                <CardContent>
                  <ChartColumnNegative />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card dir="ltr">
                <CardHeader title="Bar" />
                <CardContent>
                  <ChartBar />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card dir="ltr">
                <CardHeader title="Mixed" />
                <CardContent>
                  <ChartMixed />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card dir="ltr">
                <CardHeader title="Pie" />
                <CardContent
                  sx={{
                    height: 420,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ChartPie />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card dir="ltr">
                <CardHeader title="Donut" />
                <CardContent
                  sx={{
                    height: 420,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ChartDonut />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card dir="ltr">
                <CardHeader title="Radial Bar" />
                <CardContent
                  sx={{
                    height: 420,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ChartRadialBar />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card dir="ltr">
                <CardHeader title="Radar" />
                <CardContent
                  sx={{
                    height: 420,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ChartsRadarBar />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}
