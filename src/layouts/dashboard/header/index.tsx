// @mui
import { styled, Theme } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar } from '@mui/material';
// hooks
import useOffSetTop from '../../../hooks/useOffSetTop';
import useResponsive from '../../../hooks/useResponsive';
// utils
import cssStyles from '@utils/cssStyles';
// config
import { HEADER, NAVBAR } from '@/config.ts';
// components
import Logo from '../../../components/Logo';
import Iconify from '../../../components/Iconify';
import { IconButtonAnimate } from '../../../components/animate';
//
import Searchbar from './Searchbar';
import AccountPopover from './AccountPopover';
import ContactsPopover from './ContactsPopover';


// ----------------------------------------------------------------------

type RootPropsType = {
  isCollapse?: boolean;
  isOffset?: boolean;
  verticalLayout?: boolean;
  theme?: Theme;
};
const RootStyle = styled(AppBar, {
  shouldForwardProp: (prop: keyof RootPropsType) =>
    prop !== 'isCollapse' && prop !== 'isOffset' && prop !== 'verticalLayout',
})<RootPropsType>(({ isCollapse, isOffset, verticalLayout, theme }: RootPropsType) => ({
  ...cssStyles(theme).bgBlur(),
  boxShadow: 'none',
  height: HEADER.MOBILE_HEIGHT,
  zIndex: theme.zIndex.appBar + 1,
  transition: theme.transitions.create(['width', 'height'], {
    duration: theme.transitions.duration.shorter,
  }),
  [theme.breakpoints.up('lg')]: {
    height: HEADER.DASHBOARD_DESKTOP_HEIGHT,
    width: `calc(100% - ${NAVBAR.DASHBOARD_WIDTH + 1}px)`,
    ...(isCollapse && {
      width: `calc(100% - ${NAVBAR.DASHBOARD_COLLAPSE_WIDTH}px)`,
    }),
    ...(isOffset && {
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
    }),
    ...(verticalLayout && {
      width: '100%',
      height: HEADER.DASHBOARD_DESKTOP_OFFSET_HEIGHT,
      backgroundColor: theme.palette.background.default,
    }),
  },
}));

// ----------------------------------------------------------------------

type propTypes = {
  isCollapse?: boolean;
  onOpenSidebar?: () => any;
  verticalLayout?: boolean;
};

export default function DashboardHeader({ onOpenSidebar, isCollapse = false, verticalLayout = false }: propTypes) {
  const isOffset = useOffSetTop(HEADER.DASHBOARD_DESKTOP_HEIGHT) && !verticalLayout;

  const isDesktop = useResponsive('up', 'lg');


  return (
    <RootStyle isCollapse={isCollapse} isOffset={isOffset} verticalLayout={verticalLayout}>
      <Toolbar
        sx={{
          minHeight: '100% !important',
          px: { lg: 5 },
        }}
      >
        {isDesktop && verticalLayout && <Logo sx={{ mr: 2.5 }} />}

        {!isDesktop && (
          <IconButtonAnimate onClick={onOpenSidebar} sx={{ mr: 1, color: 'text.primary' }}>
            <Iconify icon="eva:menu-2-fill" />
          </IconButtonAnimate>
        )}

        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />

        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          {/*<LanguagePopover />*/}
          {/*<NotificationsPopover />*/}
          {/* <ContactsPopover /> */}
          <AccountPopover />
        </Stack>
      </Toolbar>
    </RootStyle>
  );
}
