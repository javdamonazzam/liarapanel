// @mui
import { Box, Paper, LinearProgress } from '@mui/material';
import { Masonry } from '@mui/lab';
//
import { Label } from '../../Block';

// ----------------------------------------------------------------------

const style = {
  p: 2,
  minHeight: 160,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { m: 1 },
};

// ----------------------------------------------------------------------

type propTypes = {
  buffer: number;
  progress: number;
};

export default function ProgressLinear({ progress, buffer }: propTypes) {
  return (
    <Masonry columns={{ xs: 1, md: 2 }} spacing={3}>
      <div>
        <Label title="Linears Indeterminate" />
        <Paper variant="outlined" sx={style}>
          <Box sx={{ width: '100%' }}>
            <LinearProgress color="inherit" /> <br />
            <LinearProgress /> <br />
            <LinearProgress color="secondary" /> <br />
            <LinearProgress color="info" /> <br />
            <LinearProgress color="success" /> <br />
            <LinearProgress color="warning" /> <br />
            <LinearProgress color="error" />
          </Box>
        </Paper>
      </div>

      <div>
        <Label title="Linears Determinate" />
        <Paper variant="outlined" sx={style}>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="determinate" value={progress} color="inherit" />
            <br />
            <LinearProgress variant="determinate" value={progress} />
            <br />
            <LinearProgress variant="determinate" value={progress} color="secondary" />
            <br />
            <LinearProgress variant="determinate" value={progress} color="info" />
            <br />
            <LinearProgress variant="determinate" value={progress} color="success" />
            <br />
            <LinearProgress variant="determinate" value={progress} color="warning" />
            <br />
            <LinearProgress variant="determinate" value={progress} color="error" />
          </Box>
        </Paper>
      </div>

      <div>
        <Label title="Linears Buffer" />
        <Paper variant="outlined" sx={style}>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} color="inherit" />
            <br />
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
            <br />
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} color="secondary" />
            <br />
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} color="info" />
            <br />
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} color="success" />
            <br />
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} color="warning" />
            <br />
            <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} color="error" />
          </Box>
        </Paper>
      </div>

      <div>
        <Label title="Linears Query" />
        <Paper variant="outlined" sx={style}>
          <Box sx={{ width: '100%' }}>
            <LinearProgress variant="query" value={progress} valueBuffer={buffer} color="inherit" />
            <br />
            <LinearProgress variant="query" value={progress} valueBuffer={buffer} />
            <br />
            <LinearProgress variant="query" value={progress} valueBuffer={buffer} color="secondary" />
            <br />
            <LinearProgress variant="query" value={progress} valueBuffer={buffer} color="info" />
            <br />
            <LinearProgress variant="query" value={progress} valueBuffer={buffer} color="success" />
            <br />
            <LinearProgress variant="query" value={progress} valueBuffer={buffer} color="warning" />
            <br />
            <LinearProgress variant="query" value={progress} valueBuffer={buffer} color="error" />
          </Box>
        </Paper>
      </div>
    </Masonry>
  );
}
