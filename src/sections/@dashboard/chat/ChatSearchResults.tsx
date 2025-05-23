// @mui
import { Avatar, Typography, ListItemButton } from '@mui/material';
//
import SearchNotFound from '../../../components/SearchNotFound';

// ----------------------------------------------------------------------
type Result = { id: number; name: string; avatar: string };
type ChatPropType = {
  query: string;
  results: Result[];
  onSelectContact: (value: Result) => void;
};

export default function ChatSearchResults({ query, results, onSelectContact }: ChatPropType) {
  const isFound = results.length > 0;

  return (
    <>
      <Typography paragraph variant="subtitle1" sx={{ px: 3, color: 'text.secondary' }}>
        Contacts
      </Typography>

      {results.map((result) => (
        <ListItemButton
          key={result.id}
          onClick={() => onSelectContact(result)}
          sx={{
            px: 3,
            py: 1.5,
            typography: 'subtitle2',
          }}
        >
          <Avatar alt={result.name} src={result.avatar} sx={{ mr: 2 }} />
          {result.name}
        </ListItemButton>
      ))}

      {!isFound && (
        <SearchNotFound
          searchQuery={query}
          sx={{
            p: 3,
            mx: 'auto',
            width: `calc(100% - 48px)`,
            bgcolor: 'background.default',
          }}
        />
      )}
    </>
  );
}
