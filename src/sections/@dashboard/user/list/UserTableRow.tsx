import { useEffect, useState } from 'react';
// @mui

import { TableRow, TableCell, Typography, MenuItem } from '@mui/material';
// components
import QrModal from '@components/QrModal.tsx';
import useDeleteUser from '@/react-query/user/useDeleteUser.ts';
import { translateSevice } from '@/utils/translateService';
import moment from 'jalali-moment';
import Label from '@/components/Label';
// import { FaDownload } from 'react-icons/fa6';
import DownloadIcon from '@mui/icons-material/Download';
import CachedIcon from '@mui/icons-material/Cached';
import { BsQrCode } from 'react-icons/bs';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FcLink } from 'react-icons/fc';
import Iconify from '@/components/Iconify';
import ConfirmModal from '@/components/ConfirmModal';
import useRenewaUser from '@/react-query/user/useRenewaUser';
// ----------------------------------------------------------------------

type UserTableRowPropTypes = {
  row: User;

};

export default function UserTableRow({row}: UserTableRowPropTypes) {
  const { title, status, service_type, createdAt, month, pharmacy, server_info } = row;
  const { mutate: RenewaUser, isPending:pend } = useRenewaUser();

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openRenewalModal, setOpenRenewalModal] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [openQrModal, setopenQrModal] = useState(false);
  const [copy, setcopy] = useState(false);
  const [openMenu, setOpenMenuActions] = useState(null);
  const { mutate: deleteUser, isPending } = useDeleteUser();
  // console.log(translateSevice[service_type]);
  const onRenewalRow = (id: number) => {
    RenewaUser(id);
    setTimeout(() => {
      
    }, 2000);
    setOpenRenewalModal(false)

  };
  const DeleteRow = (id: number) => {
    deleteUser(id);
    setTimeout(() => {
      
    }, 2000);
    setOpenDeleteModal(false)

  };
  // let today = new createdAt().toLocaleDateString('fa-IR');
  const jalaliDate = moment(createdAt, 'YYYY-MM-DD').locale('fa').format('YYYY/MM/DD');
  const date = new Date(createdAt);
  const timestamp = Math.floor(date.getTime() / 1000);
  const daysecend = Math.floor(month * 30 * 86400);
  const today = new Date();
  const todaytimestamp = Math.floor(today.getTime() / 1000);
  const endDate = Math.round((timestamp + daysecend - todaytimestamp) / 86400);

  const onButtonClick = () => {
    // Create a Blob from the server_info data
    const blob = new Blob([server_info], { type: 'conf/plain' });
    const url = URL.createObjectURL(blob);

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title}${service_type == 'OPENVPN' ? '.ovpn' : '.conf'}`; // Specify the filename
    document.body.appendChild(link);

    // Trigger a click event to start the download
    link.click();

    // Clean up
    document.body.removeChild(link);
    URL.revokeObjectURL(url); // Release the URL object
  };
  const handleOpenMenu = (event) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenDeleteModal(false)
    setOpenRenewalModal(false)
  };

  return (
    <TableRow hover>
      <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="subtitle2" noWrap></Typography>
      </TableCell>

      {/* <TableCell align="left">{translateRole[role]}</TableCell> */}
      <TableCell align="left">{title}</TableCell>
      <TableCell align="left">{translateSevice[service_type]}</TableCell>
      <TableCell align="left">{jalaliDate}</TableCell>
      <TableCell align="left">{endDate}</TableCell>
      <TableCell align="left" style={{ paddingTop: '5px' }}>
        <Label
          variant={'filled'}
          color={(status === true && 'success') || (status === false && 'warning') || 'default'}
        >
          {status == true ? 'فعال' : 'غیرفعال'}
        </Label>
      </TableCell>
      <TableCell align="left">
        <button
          onClick={onButtonClick}
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
        >
          <DownloadIcon style={{ border: 'none' }} />
        </button>
      </TableCell>
      {service_type == 'WIRE' ? (
        <TableCell align="right" >
          <QrModal
            open={openQrModal}
            isLoading={isPending}
            onConfirm={() => DeleteRow(row.id)}
            handleClose={() => setopenQrModal(false)}
            text={server_info}
          />
          <MenuItem
            onClick={() => {
              setopenQrModal(true);
              handleCloseMenu();
            }}
            sx={{ color: 'error.main' }}
          >
            <BsQrCode size={25} />
          </MenuItem>
        </TableCell>
      ) : (
        <TableCell align="left" className="hover:bg-dark-950">
          <CopyToClipboard
            text={process.env.NEXT_PUBLIC_URL + 'service/public?title=' + title}
            onCopy={() => setcopy(true)}
          >
            <MenuItem >
              <FcLink size={35} />
            </MenuItem>
          </CopyToClipboard>
        </TableCell>
      )}
      <TableCell align="left">
      <ConfirmModal
          open={openDeleteModal}
          isLoading={isPending}
          onConfirm={() => DeleteRow(row.id)}
          handleClose={() => setOpenDeleteModal(false)}
          text={'ایا مطمئن هستید میخواهید این اکانت را پاک کنید؟'}
        />
        <MenuItem
          onClick={() => {
            setOpenDeleteModal(true);
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon={'eva:trash-2-outline'} />
          حذف
        </MenuItem>
      </TableCell>
      <TableCell align="left">
      <ConfirmModal
          open={openRenewalModal}
          isLoading={isPending}
          onConfirm={() => onRenewalRow(row.id)}
          handleClose={() => setOpenRenewalModal(false)}
          text={'ایا مطمئن هستید میخواهید این اکانت را تمدید کنید؟'}
        />
        <MenuItem
          onClick={() => {
            setOpenRenewalModal(true);
          }}
          sx={{ color: '' }}
        >
          <CachedIcon/>
          <h4 style={{paddingRight:'10px', color:'blueviolet'}}>تمدید</h4>
        </MenuItem>
      </TableCell>
    </TableRow>
  );
}

// saeed monazzam
// farzane abedi
// abolfazl abedi