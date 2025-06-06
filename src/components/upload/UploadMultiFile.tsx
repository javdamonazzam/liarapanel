import { DropzoneProps, useDropzone } from 'react-dropzone';
// @mui
import { SxProps, styled } from '@mui/material/styles';
import { Box } from '@mui/material';
//
import BlockContent from './BlockContent';
import RejectionFiles from './RejectionFiles';
import MultiFilePreview from './MultiFilePreview';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.default,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
}));

// ----------------------------------------------------------------------

export type UploadMultiFilePropTypes = {
  error?: boolean;
  showPreview?: boolean;
  files?: any[];
  onRemove?: (value: any) => void;
  onRemoveAll?: () => void;
  helperText?: ReactNode;
  sx?: SxProps;
} & DropzoneProps;

export default function UploadMultiFile({
  error,
  showPreview = false,
  files,
  onRemove,
  onRemoveAll,
  helperText,
  sx,
  ...other
}: UploadMultiFilePropTypes) {
  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    ...other,
  });

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter',
          }),
        }}
      >
        <input {...getInputProps()} />

        <BlockContent />
      </DropZoneStyle>

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}

      <MultiFilePreview files={files} showPreview={showPreview} onRemove={onRemove} onRemoveAll={onRemoveAll} />

      {helperText && helperText}
    </Box>
  );
}
