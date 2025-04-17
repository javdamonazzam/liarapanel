// @mui
import { TableRow, TableCell } from '@mui/material';
//
import EmptyContent from '../EmptyContent';

// ----------------------------------------------------------------------

type TableNoDataPropTypes = {
  isNotFound: boolean;
};

export default function TableNoData({ isNotFound }: TableNoDataPropTypes) {
  return (
    <>
      {isNotFound ? (
        <TableRow>
          <TableCell colSpan={9}>
            <EmptyContent
              title="داده ای وجود ندارد"
              sx={{
                '& span.MuiBox-root': { height: 160 },
              }}
            />
          </TableCell>
        </TableRow>
      ) : (
        <TableRow>
          <TableCell colSpan={9} sx={{ p: 0 }} />
        </TableRow>
      )}
    </>
  );
}
