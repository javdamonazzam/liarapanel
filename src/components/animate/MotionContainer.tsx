import { m } from 'framer-motion';
// @mui
import { Box } from '@mui/material';
//
import { varContainer } from './variants';
import { ReactNode } from 'react';

// ----------------------------------------------------------------------

type MotionContainerPropTypes = {
  action?: boolean;
  animate?: boolean;
  children: ReactNode;
};

export default function MotionContainer({ animate, action = false, children, ...other }: MotionContainerPropTypes) {
  if (action) {
    return (
      <Box
        component={m.div}
        initial={false}
        animate={animate ? 'animate' : 'exit'}
        variants={varContainer()}
        {...other}
      >
        {children}
      </Box>
    );
  }

  return (
    <Box component={m.div} initial="initial" animate="animate" exit="exit" variants={varContainer()} {...other}>
      {children}
    </Box>
  );
}
