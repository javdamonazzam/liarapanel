import { ReactNode, useState } from 'react';
// @mui
import { useTheme } from '@mui/material/styles';
import { Stack, Typography, Box, Rating, LinearProgress, IconButton } from '@mui/material';
import { DataGrid, GridAlignment, GridToolbar, getGridNumericOperators } from '@mui/x-data-grid';
// utils
import createAvatar from '@utils/createAvatar';
import { fPercent } from '@utils/formatNumber.tsx';
// _mock_
import { _dataGrid } from '@/_mock';
// components
import Label from '@components/Label';
import Avatar from '@components/Avatar';
import Iconify from '@components/Iconify';

// ----------------------------------------------------------------------

const columns: {
  field: string;
  type?: string;
  headerName?: string;
  valueOptions?: string | string[];
  align?: GridAlignment;
  headerAlign?: GridAlignment;
  width?: number;
  hide?: boolean;
  sortable?: boolean;
  flex?: number;
  filterable?: boolean;
  disableColumnMenu?: boolean;
  editable?: boolean;
  filterOperators?: any;
  renderCell?: (params) => ReactNode;
}[] = [
  // OPTIONS
  // https://material-ui.com/api/data-grid/grid-col-def/#main-content
  // - hide: false (default)
  // - editable: false (default)
  // - filterable: true (default)
  // - sortable: true (default)
  // - disableColumnMenu: false (default)

  // FIELD TYPES
  // --------------------
  // 'string' (default)
  // 'number'
  // 'date'
  // 'dateTime'
  // 'boolean'
  // 'singleSelect'

  {
    field: 'id',
    hide: true,
  },
  {
    field: 'avatar',
    headerName: 'Avatar',
    align: 'center',
    headerAlign: 'center',
    width: 64,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      const getAvatar = params.row.name;
      return (
        <Avatar color={createAvatar(getAvatar).color} sx={{ width: 36, height: 36 }}>
          {createAvatar(getAvatar).name}
        </Avatar>
      );
    },
  },
  {
    field: 'name',
    headerName: 'Name',
    flex: 1,
    editable: true,
  },
  {
    field: 'email',
    headerName: 'Email',
    flex: 1,
    editable: true,
    renderCell: (params) => {
      const getEmail = params.row.email;

      return (
        <Typography variant="body2" sx={{ textDecoration: 'underline' }} noWrap>
          {getEmail}
        </Typography>
      );
    },
  },
  {
    field: 'lastLogin',
    type: 'dateTime',
    headerName: 'Last login',
    align: 'right',
    headerAlign: 'right',
    width: 200,
  },
  {
    field: 'rating',
    type: 'number',
    headerName: 'Rating',
    width: 160,
    disableColumnMenu: true,
    renderCell: (params) => <Rating size="small" value={params.row.rating} precision={0.5} readOnly />,
  },
  {
    field: 'status',
    type: 'singleSelect',
    headerName: 'Status',
    valueOptions: ['online', 'away', 'busy'],
    align: 'center',
    headerAlign: 'center',
    width: 120,

    renderCell: (params) => RenderStatus(params.row.status),
  },
  {
    field: 'isAdmin',
    type: 'boolean',
    align: 'center',
    headerAlign: 'center',
    width: 120,

    renderCell: (params) => {
      const getAdmin = params.row.isAdmin;
      return (
        <>
          {getAdmin ? (
            <Iconify icon={'eva:checkmark-circle-2-fill'} sx={{ width: 20, height: 20, color: 'primary.main' }} />
          ) : (
            '-'
          )}
        </>
      );
    },
  },
  {
    field: 'performance',
    type: 'number',
    headerName: 'Performance',
    align: 'center',
    headerAlign: 'center',
    width: 160,
    renderCell: (params) => {
      const value = params.row.performance;

      return (
        <Stack spacing={1} direction="row" alignItems="center" sx={{ px: 1, width: 1, height: 1 }}>
          <LinearProgress
            value={value}
            variant="determinate"
            color={(value < 30 && 'error') || (value > 30 && value < 70 && 'warning') || 'primary'}
            sx={{ width: 1, height: 6 }}
          />
          <Typography variant="caption" sx={{ width: 80 }}>
            {fPercent(value)}
          </Typography>
        </Stack>
      );
    },
  },
  {
    field: 'action',
    headerName: ' ',
    align: 'right',
    width: 80,
    sortable: false,
    filterable: false,
    disableColumnMenu: true,
    renderCell: (params) => {
      const selectedID = params.row.id;

      const handleClick = () => {
        console.log('selectedID', selectedID);
      };

      return (
        <IconButton onClick={handleClick}>
          <Iconify icon={'eva:more-vertical-fill'} sx={{ width: 20, height: 20 }} />
        </IconButton>
      );
    },
  },
];

// ----------------------------------------------------------------------

export default function DataGridCustom() {
  const [selectionModel, setSelectionModel] = useState([]);

  if (columns.length > 0) {
    const ratingColumn = columns.find((column) => column.field === 'rating');
    const ratingColIndex = columns.findIndex((col) => col.field === 'rating');

    const ratingFilterOperators = getGridNumericOperators().map((operator) => ({
      ...operator,
      InputComponent: RatingInputValue,
    }));
    columns[ratingColIndex] = {
      ...ratingColumn,
      filterOperators: ratingFilterOperators,
    };
  }

  const selected = _dataGrid.filter((row) => selectionModel.includes(row.id));

  console.log('selected', selected);

  return (
    <>
      <DataGrid
        checkboxSelection
        rows={_dataGrid}
        columns={columns}
        pagination
        onRowSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
        slots={{
          toolbar: GridToolbar,
        }}
      />
    </>
  );
}

// ----------------------------------------------------------------------

function RenderStatus(getStatus) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  return (
    <Label
      variant={isLight ? 'ghost' : 'filled'}
      color={(getStatus === 'busy' && 'error') || (getStatus === 'away' && 'warning') || 'success'}
      sx={{ textTransform: 'capitalize', mx: 'auto' }}
    >
      {getStatus}
    </Label>
  );
}

// ----------------------------------------------------------------------

type propTypes = {
  applyValue?: (value?: object) => void;
  item?: {
    value?: number;
  };
};

function RatingInputValue({ item, applyValue }: propTypes) {
  return (
    <Box sx={{ p: 1, height: 1, alignItems: 'flex-end', display: 'flex' }}>
      <Rating
        size="small"
        precision={0.5}
        value={Number(item.value)}
        onChange={(event, newValue) => {
          applyValue({ ...item, value: newValue });
        }}
      />
    </Box>
  );
}
