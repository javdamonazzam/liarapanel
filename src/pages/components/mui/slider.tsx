import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, Slider, Container, Typography } from '@mui/material';
import { Masonry } from '@mui/lab';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// layouts
import Layout from '../../../layouts';
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import { Block } from '../../../sections/overview/Block';

// ----------------------------------------------------------------------

const marks = [
  { value: 0, label: '0°C' },
  { value: 20, label: '20°C' },
  { value: 37, label: '37°C' },
  { value: 100, label: '100°C' },
];

const prices = [
  { value: 0, label: '$0' },
  { value: 25, label: '250' },
  { value: 50, label: '500' },
  { value: 75, label: '750' },
  { value: 100, label: '1000' },
];

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { mx: '8px !important' },
};

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

function valuePrice(value) {
  return value > 0 ? `$${value}0` : `${value}`;
}

function valueLabelFormatPrice(value) {
  return value > 0 ? `$${value}` : value;
}

function valuetext(value) {
  return `$${value}°C`;
}

function valueLabelFormat(value) {
  return marks.findIndex((mark) => mark.value === value) + 1;
}

// ----------------------------------------------------------------------

MUISlider.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUISlider() {
  const [value, setValue] = useState(30);

  const [price, setPrice] = useState([20, 37]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangePrice = (event, newValue) => {
    setPrice(newValue);
  };

  return (
    <Page title="Components: Slider">
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
              heading="Slider"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Slider' }]}
              moreLink="https://mui.com/components/slider"
            />
          </Container>
        </Box>

        <Container>
          <Masonry columns={{ xs: 1, md: 3 }} spacing={3}>
            <Block title="Volume" sx={style}>
              <Stack direction="row" alignItems="center" spacing={1} width={1}>
                <Iconify icon="eva:volume-mute-fill" width={24} height={24} />
                <Slider value={value} onChange={handleChange} aria-labelledby="continuous-slider" />
                <Iconify icon="eva:volume-up-fill" width={24} height={24} />
              </Stack>
            </Block>

            <Block title="Disabled" sx={style}>
              <Slider disabled defaultValue={30} />
            </Block>

            <Block title="Temperature" sx={style}>
              <Slider
                defaultValue={30}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={110}
              />
            </Block>

            <Block title="Size" sx={style}>
              <Slider
                size="medium"
                marks
                min={10}
                step={10}
                max={110}
                defaultValue={30}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />

              <Slider
                marks
                min={10}
                step={10}
                max={110}
                defaultValue={30}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
              />
            </Block>

            <Block title="Small steps" sx={style}>
              <Slider
                defaultValue={0.00000005}
                getAriaValueText={valuetext}
                step={0.00000001}
                marks
                min={-0.00000005}
                max={0.0000001}
                valueLabelDisplay="auto"
              />
            </Block>

            <Block title="Custom marks" sx={style}>
              <Slider defaultValue={20} getAriaValueText={valuetext} step={10} valueLabelDisplay="auto" marks={marks} />
            </Block>

            <Block title="Restricted values" sx={style}>
              <Slider
                defaultValue={20}
                valueLabelFormat={valueLabelFormat}
                getAriaValueText={valuetext}
                step={null}
                valueLabelDisplay="auto"
                marks={marks}
              />
            </Block>

            <Block title="Range" sx={style}>
              <Box sx={{ width: '100%' }}>
                <Slider
                  scale={(x) => x * 10}
                  step={10}
                  marks={prices}
                  value={price}
                  onChange={handleChangePrice}
                  valueLabelDisplay="on"
                  getAriaValueText={valuePrice}
                  valueLabelFormat={valueLabelFormatPrice}
                />
              </Box>
              <Box
                sx={{
                  p: 2,
                  width: '100%',
                  borderRadius: 1,
                  bgcolor: 'grey.50012',
                }}
              >
                <Typography variant="subtitle2" gutterBottom>
                  Min: {valuePrice(price[0])}
                </Typography>
                <Typography variant="subtitle2">Max: {valuePrice(price[1])}</Typography>
              </Box>
            </Block>
          </Masonry>
        </Container>
      </RootStyle>
    </Page>
  );
}
