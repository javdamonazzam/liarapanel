// @mui
import { Box, Chip, Avatar, Checkbox, AvatarGroup, FormControlLabel } from '@mui/material';
// utils
import { fShortenNumber } from '@utils/formatNumber';
// components
import Iconify from '@components/Iconify';

// ----------------------------------------------------------------------

type propTypes = {
  post: { favorite: number; tags: string[]; favoritePerson: { name: string; avatarUrl: string }[] };
};

export default function BlogPostTags({ post }: propTypes) {
  const { favorite, tags, favoritePerson } = post;

  return (
    <Box sx={{ py: 3 }}>
      {tags.map((tag) => (
        <Chip key={tag} label={tag} sx={{ m: 0.5 }} />
      ))}

      <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
        <FormControlLabel
          control={
            <Checkbox
              defaultChecked
              size="small"
              color="error"
              icon={<Iconify icon="eva:heart-fill" />}
              checkedIcon={<Iconify icon="eva:heart-fill" />}
            />
          }
          label={fShortenNumber(favorite)}
        />
        <AvatarGroup
          max={4}
          sx={{
            '& .MuiAvatar-root': { width: 32, height: 32 },
          }}
        >
          {favoritePerson.map((person) => (
            <Avatar key={person.name} alt={person.name} src={person.avatarUrl} />
          ))}
        </AvatarGroup>
      </Box>
    </Box>
  );
}
