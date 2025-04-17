import { useState } from 'react';
import { Box, Button, Fade, Modal, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import { LoadingButton } from '@mui/lab';
import QRCode from 'react-qr-code';
type propsType = {
  open: boolean;
  handleClose: () => void;
  text: string;
  isLoading: boolean;
  onConfirm: () => void;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};

export default function ConfirmModal({ open = false, handleClose, text, onConfirm, isLoading = false }: propsType) {
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Box>
          <QRCode
          size={256}
          style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
          value={text}
          viewBox={`0 0 256 256`}
        />
          </Box>

        </Box>
      </Fade>
    </Modal>
  );
}
