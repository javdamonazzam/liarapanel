import { ReactElement, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Checkbox, TableRow, TableCell, Typography, Stack, MenuItem } from '@mui/material';
import Link from '@components/Link';
// utils
import { fDate } from '@utils/formatTime.tsx';
import createAvatar from '@utils/createAvatar';
import { fCurrency } from '@utils/formatNumber.tsx';
// components
import Label from '@components/Label';
import Iconify from '@components/Iconify';
import { TableMoreMenu } from '@components/table';
import ConfirmModal from '@components/ConfirmModal.tsx';
import useDeleteFactor from '@/react-query/factors/useDeleteFactor.ts';
import { FACTOR_STATUS_TRANSLATE } from '@locales/enumTranslate.ts';
import { useRouter } from 'next/router';
import moment from 'jalali-moment';

// ----------------------------------------------------------------------

type InvoiceTableRowPropTypes = {
  row: Factor;
  index: number;
  onEditRow: () => void;
  onDeleteRow: () => void;
};

export default function InvoiceTableRow({
  row,
  index,
  onEditRow,
  onDeleteRow,
}: InvoiceTableRowPropTypes): ReactElement {
  // Use the theme from Material UI
  const theme = useTheme();

  // Destructure the row data
  const { status, pharmacy, price, id, createdAt, creator } = row;
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  // State for the open menu
  const [openMenu, setOpenMenuActions] = useState(null);
  const { isPending } = useDeleteFactor();
  const handleOpenMenu = (event) => {
    event.stopPropagation();
    setOpenMenuActions(event.currentTarget);
  };

  // Handle closing the menu
  const handleCloseMenu = (e) => {
    e.stopPropagation();
    setOpenMenuActions(null);
  };
  const router = useRouter();
  console.log();

  // Render the row
  return (
    <TableRow onClick={() => router.push(`${id}/edit`)} sx={{ cursor: 'pointer' }} hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Stack>
          <Typography variant="subtitle2" noWrap></Typography>
          {++index}
          <Link
            href={'/dashboard/invoice/' + id}
            noWrap
            variant="body2"
            sx={{ color: 'text.disabled', cursor: 'pointer' }}
          >
          </Link>
        </Stack>
      </TableCell>
      <TableCell align="left">{moment(createdAt, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD')}</TableCell>
      <TableCell align="left">{price}</TableCell>

      <TableCell align="left">
        <Label
          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
          color={
            (status === 'PAID' && 'success') ||
            (status === 'PENDING' && 'warning') ||
            (status === 'UNPAID' && 'error') ||
            'default'
          }
          sx={{ textTransform: 'capitalize' }}
        >
          {FACTOR_STATUS_TRANSLATE[status]}
        </Label>
      </TableCell>
      <TableCell align="right">
        <ConfirmModal
          onConfirm={onDeleteRow}
          open={openDeleteModal}
          isLoading={isPending}
          handleClose={() => setOpenDeleteModal(false)}
          text={'ایا مطمئن هستید میخواهید این فاکتور را پاک کنید؟'}
        />
        <TableMoreMenu
          open={openMenu}
          onOpen={handleOpenMenu}
          onClose={handleCloseMenu}
          actions={
            <>
              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  setOpenDeleteModal(true);
                  handleCloseMenu(e);
                }}
                sx={{ color: 'error.main' }}
              >
                <Iconify icon={'eva:trash-2-outline'} />
                حذف
              </MenuItem>

              {/*<MenuItem*/}
              {/*  onClick={() => {*/}
              {/*    onViewRow();*/}
              {/*    handleCloseMenu();*/}
              {/*  }}*/}
              {/*>*/}
              {/*  <Iconify icon={'eva:eye-fill'} />*/}
              {/*  نمایش*/}
              {/*</MenuItem>*/}

              <MenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onEditRow();
                  handleCloseMenu(e);
                }}
              >
                <Iconify icon={'eva:edit-fill'} />
                ویرایش
              </MenuItem>
            </>
          }
        />
      </TableCell>
    </TableRow>
  );
}
