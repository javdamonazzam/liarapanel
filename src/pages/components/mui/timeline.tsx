// @mui
import { styled } from '@mui/material/styles';
import { Box, Paper, Container, Typography } from '@mui/material';
import {
  Masonry,
  Timeline,
  TimelineDot,
  TimelineItem,
  TimelineContent,
  TimelineSeparator,
  TimelineConnector,
  TimelineOppositeContent,
} from '@mui/lab';
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

const TIMELINES = [
  {
    key: 1,
    title: 'Default',
    des: 'Morbi mattis ullamcorper',
    time: '09:30 am',
    icon: <Iconify icon="eva:folder-add-fill" width={24} height={24} />,
  },
  {
    key: 2,
    title: 'Primary',
    des: 'Morbi mattis ullamcorper',
    time: '10:00 am',
    color: 'primary',
    icon: <Iconify icon="eva:image-2-fill" width={24} height={24} />,
  },
  {
    key: 3,
    title: 'Secondary',
    des: 'Morbi mattis ullamcorper',
    time: '10:00 am',
    color: 'secondary',
    icon: <Iconify icon="eva:pantone-fill" width={24} height={24} />,
  },
  {
    key: 4,
    title: 'Info',
    des: 'Morbi mattis ullamcorper',
    time: '10:30 am',
    color: 'info',
    icon: <Iconify icon="eva:tv-fill" width={24} height={24} />,
  },
  {
    key: 5,
    title: 'Success',
    des: 'Morbi mattis ullamcorper',
    time: '11:00 am',
    color: 'success',
    icon: <Iconify icon="eva:activity-fill" width={24} height={24} />,
  },
  {
    key: 6,
    title: 'Warning',
    des: 'Morbi mattis ullamcorper',
    time: '11:30 am',
    color: 'warning',
    icon: <Iconify icon="eva:cube-fill" width={24} height={24} />,
  },
  {
    key: 7,
    title: 'Error',
    des: 'Morbi mattis ullamcorper',
    time: '12:00 am',
    color: 'error',
    icon: <Iconify icon="eva:film-fill" width={24} height={24} />,
  },
];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15),
}));

// ----------------------------------------------------------------------

MUITimeline.getLayout = function getLayout(page: React.ReactNode) {
  return <Layout variant="main">{page}</Layout>;
};

// ----------------------------------------------------------------------

export default function MUITimeline() {
  const lastItem = TIMELINES[TIMELINES.length - 1].key;

  const reduceTimeLine = TIMELINES.slice(TIMELINES.length - 3);

  return (
    <Page title="Components: Timeline">
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
              heading="Timeline"
              links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Timeline' }]}
              moreLink="https://mui.com/components/timeline"
            />
          </Container>
        </Box>

        <Container>
          <Masonry columns={{ xs: 1, md: 3 }} spacing={3}>
            <Block title="Default">
              <Timeline>
                {reduceTimeLine.map((item) => (
                  <TimelineItem key={item.key}>
                    <TimelineSeparator>
                      <TimelineDot />
                      {lastItem === item.key ? null : <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>{item.title}</TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Block>

            <Block title="Right">
              <Timeline position="right">
                {reduceTimeLine.map((item) => (
                  <TimelineItem key={item.key}>
                    <TimelineSeparator>
                      <TimelineDot />
                      {lastItem === item.key ? null : <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>{item.title}</TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Block>

            <Block title="Alternating">
              <Timeline position="alternate">
                {reduceTimeLine.map((item) => (
                  <TimelineItem key={item.key}>
                    <TimelineSeparator>
                      <TimelineDot />
                      {lastItem === item.key ? null : <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>{item.title}</TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Block>

            <Block title="Filled">
              <Timeline position="alternate">
                {TIMELINES.map((item) => (
                  <TimelineItem key={item.key}>
                    <TimelineSeparator>
                      <TimelineDot color={item.color} />
                      {lastItem === item.key ? null : <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>{item.title}</TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Block>

            <Block title="Outlined">
              <Timeline position="alternate">
                {TIMELINES.map((item) => (
                  <TimelineItem key={item.key}>
                    <TimelineSeparator>
                      <TimelineDot variant="outlined" color={item.color} />
                      {lastItem === item.key ? null : <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>{item.title}</TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Block>

            <Block title="Opposite content">
              <Timeline position="alternate">
                {TIMELINES.map((item) => (
                  <TimelineItem key={item.key}>
                    <TimelineOppositeContent>
                      <Typography sx={{ color: 'text.secondary' }}>{item.time}</Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                      <TimelineDot color={item.color} />
                      {lastItem === item.key ? null : <TimelineConnector />}
                    </TimelineSeparator>
                    <TimelineContent>
                      <Typography> {item.title}</Typography>
                    </TimelineContent>
                  </TimelineItem>
                ))}
              </Timeline>
            </Block>
          </Masonry>

          <Block title="Customized">
            <Timeline position="alternate">
              {TIMELINES.map((item) => (
                <TimelineItem key={item.key}>
                  <TimelineOppositeContent>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {item.time}
                    </Typography>
                  </TimelineOppositeContent>
                  <TimelineSeparator>
                    <TimelineDot color={item.color}>{item.icon}</TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Paper
                      sx={{
                        p: 3,
                        bgcolor: 'grey.50012',
                      }}
                    >
                      <Typography variant="subtitle2">{item.title}</Typography>
                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {item.des}
                      </Typography>
                    </Paper>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          </Block>
        </Container>
      </RootStyle>
    </Page>
  );
}
