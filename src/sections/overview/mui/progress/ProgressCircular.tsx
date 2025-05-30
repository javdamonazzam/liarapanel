// @mui
import { Paper, CircularProgress } from '@mui/material';
import { Masonry } from '@mui/lab';
//
import { Label } from '../../Block';

// ----------------------------------------------------------------------

const style = {
  minHeight: 160,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { m: 1 },
};

// ----------------------------------------------------------------------

type propTypes = {
  progress: number;
};

export default function ProgressCircular({ progress }: propTypes) {
  return (
    <Masonry columns={{ xs: 1, md: 3 }} spacing={3}>
      <div>
        <Label title="Circular Indeterminate" />
        <Paper variant="outlined" sx={style}>
          <CircularProgress color="inherit" />
          <CircularProgress />
          <CircularProgress color="secondary" />
          <CircularProgress color="info" />
          <CircularProgress color="success" />
          <CircularProgress color="warning" />
          <CircularProgress color="error" />
        </Paper>
      </div>

      <div>
        <Label title="Circular determinate" />
        <Paper variant="outlined" sx={style}>
          <CircularProgress color="info" />
          <CircularProgress color="info" variant="determinate" value={25} />
          <CircularProgress color="info" variant="determinate" value={50} />
          <CircularProgress color="info" variant="determinate" value={75} />
          <CircularProgress color="info" variant="determinate" value={100} />
          <CircularProgress color="info" variant="determinate" value={progress} />
        </Paper>
      </div>

      <div>
        <Label title="Circular Size" />
        <Paper variant="outlined" sx={style}>
          <CircularProgress size={48} color="info" />
          <CircularProgress color="info" />
          <CircularProgress size={32} color="info" />
          <CircularProgress size={24} color="info" />
        </Paper>
      </div>
    </Masonry>
  );
}
