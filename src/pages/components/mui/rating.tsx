import { useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Rating, Container } from '@mui/material';
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

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

const customIcons = {
  1: {
    icon: <Iconify icon="ic:round-sentiment-very-dissatisfied" />,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <Iconify icon="ic:round-sentiment-dissatisfied" />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <Iconify icon="ic:round-sentiment-neutral" />,
    label: 'Neutral',
  },
  4: {
    icon: <Iconify icon="ic:round-sentiment-satisfied" />,
    label: 'Satisfied',
  },
  5: {
    icon: <Iconify icon="ic:round-sentiment-very-satisfied" />,
    label: 'Very Satisfied',
  },
};

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

MUIRating.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------
type propsType = {
  value: number;
};

function IconContainer(props: propsType) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

export default function MUIRating() {
  const [value, setValue] = useState(2);

  const [hover, setHover] = useState(-1);

  return (
    <Page title="Components: Rating">
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
              heading="Rating"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Rating' }]}
              moreLink="https://mui.com/components/rating"
            />
          </Container>
        </Box>

        <Container>
          <Masonry columns={{ xs: 1, sm: 2, md: 3 }} spacing={3}>
            <Block title="Controlled" sx={style}>
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
              />
            </Block>

            <Block title="Read only" sx={style}>
              <Rating name="read-only" value={value} readOnly />
            </Block>

            <Block title="Disabled" sx={style}>
              <Rating name="disabled" value={value} disabled />
            </Block>

            <Block title="Pristine" sx={style}>
              <Rating name="pristine" value={null} />
            </Block>

            <Block title="Custom empty icon" sx={style}>
              <Rating name="customized-empty" defaultValue={2} precision={0.5} />
            </Block>

            <Block title="Custom icon and color" sx={style}>
              <Rating
                name="customized-color"
                defaultValue={2}
                getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
                precision={0.5}
                icon={<Iconify icon="eva:heart-fill" />}
                emptyIcon={<Iconify icon="eva:heart-fill" />}
                sx={{
                  color: 'info.main',
                  '&:hover': { color: 'info.dark' },
                }}
              />
            </Block>

            <Block title="10 stars" sx={style}>
              <Rating name="customized-10" defaultValue={2} max={10} />
            </Block>
            <Block title="Custom icon set" sx={style}>
              <Rating
                name="customized-icons"
                defaultValue={2}
                getLabelText={(value) => customIcons[value].label}
                IconContainerComponent={IconContainer}
              />
            </Block>
            <Block title="Hover feedback" sx={style}>
              <Rating
                name="hover-feedback"
                value={value}
                precision={0.5}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                onChangeActive={(event, newHover) => {
                  setHover(newHover);
                }}
              />
              {value !== null && <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>}
            </Block>

            <Block title="Half ratings" sx={style}>
              <Rating name="half-rating" defaultValue={2.5} precision={0.5} />
              <br />
              <Rating name="half-rating-read" defaultValue={2.5} precision={0.5} readOnly />
            </Block>

            <Block title="Sizes" sx={style}>
              <Rating name="size-small" defaultValue={2} size="small" />
              <br />
              <Rating name="size-medium" defaultValue={2} />
              <br />
              <Rating name="size-large" defaultValue={2} size="large" />
            </Block>
          </Masonry>
        </Container>
      </RootStyle>
    </Page>
  );
}
