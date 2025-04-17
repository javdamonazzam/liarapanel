// @mui
import { Box, Typography, Breadcrumbs as MUIBreadcrumbs } from '@mui/material';
import Link from './Link';

// ----------------------------------------------------------------------

type propTypes = {
  activeLast?: boolean;
  links: any[];
};

export default function Breadcrumbs({ links, activeLast = false, ...other }: propTypes) {
  const currentLink = links[links.length - 1].name;

  const listDefault = links.map((link) => <LinkItem key={link.name} link={link} />);

  const listActiveLast = links.map((link) => (
    <div key={link.name}>
      {link.name !== currentLink ? (
        <LinkItem link={link} />
      ) : (
        <Typography
          variant="body2"
          sx={{
            maxWidth: 260,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            color: 'text.disabled',
            textOverflow: 'ellipsis',
          }}
        >
          {currentLink}
        </Typography>
      )}
    </div>
  ));

  return (
    <MUIBreadcrumbs
      separator={<Box component="span" sx={{ width: 4, height: 4, borderRadius: '50%', bgcolor: 'text.disabled' }} />}
      {...other}
    >
      {activeLast ? listDefault : listActiveLast}
    </MUIBreadcrumbs>
  );
}

// ----------------------------------------------------------------------

type LinkItemPropTypes = {
  link: {
    href: string;
    icon: any;
    name: string;
  };
};

function LinkItem({ link }: LinkItemPropTypes) {
  const { href = '', name, icon } = link;
  return (
    <Link
      href={href}
      key={name}
      variant="body2"
      sx={{
        lineHeight: 2,
        display: 'flex',
        alignItems: 'center',
        color: 'text.primary',
        '& > div': { display: 'inherit' },
      }}
    >
      {icon && <Box sx={{ mr: 1, '& svg': { width: 20, height: 20 } }}>{icon}</Box>}
      {name}
    </Link>
  );
}
