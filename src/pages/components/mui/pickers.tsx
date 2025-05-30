import { useState } from 'react';
// @mui
import { TabPanel, TabContext, TabList } from '@mui/lab';
import { styled } from '@mui/material/styles';
import { Box, Container, Tab } from '@mui/material';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import PickerDate from '../../../sections/overview/mui/pickers/PickerDate';
import PickerTime from '../../../sections/overview/mui/pickers/PickerTime';
import PickerDateTime from '../../../sections/overview/mui/pickers/PickerDateTime';
import PickerDateRange from '../../../sections/overview/mui/pickers/PickerDateRange';

// ----------------------------------------------------------------------

const PICKERS = [
  { name: 'Date', component: <PickerDate /> },
  { name: 'DateTime', component: <PickerDateTime /> },
  { name: 'DateRange', component: <PickerDateRange /> },
  { name: 'Time', component: <PickerTime /> },
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

MUIPickers.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUIPickers() {
  const [value, setValue] = useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Page title="Components: Pickers">
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
              heading="Date / Time pickers"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Date / Time pickers' }]}
              moreLink="https://mui.com/components/pickers"
            />
          </Container>
        </Box>

        <Container>
          <TabContext value={value}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              {PICKERS.map((tab, index) => (
                <Tab disableRipple key={tab.name} label={tab.name} value={String(index + 1)} />
              ))}
            </TabList>

            {PICKERS.map((tab, index) => (
              <TabPanel key={tab.name} value={String(index + 1)} sx={{ mt: 5 }}>
                {tab.component}
              </TabPanel>
            ))}
          </TabContext>
        </Container>
      </RootStyle>
    </Page>
  );
}
