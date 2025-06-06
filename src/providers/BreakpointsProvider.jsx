import { createContext, useContext, useEffect, useState } from 'react';
import { useTheme, useMediaQuery } from '@mui/material';

export const BreakpointContext = createContext({});

const BreakpointsProvider = ({ children }) => {
  const theme = useTheme();

  // Media queries for breakpoints
  const isXs = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
  const isSm = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isMd = useMediaQuery(theme.breakpoints.between('md', 'lg'));
  const isLg = useMediaQuery(theme.breakpoints.between('lg', 'xl'));
  const isXl = useMediaQuery(theme.breakpoints.up('xl'));

  const up = (key) => useMediaQuery(theme.breakpoints.up(key));
  const down = (key) => useMediaQuery(theme.breakpoints.down(key));
  const only = (key) => useMediaQuery(theme.breakpoints.only(key));
  const between = (start, end) => useMediaQuery(theme.breakpoints.between(start, end));

  const [currentBreakpoint, setCurrentBreakpoint] = useState('xs');

  useEffect(() => {
    if (isXs) setCurrentBreakpoint('xs');
    else if (isSm) setCurrentBreakpoint('sm');
    else if (isMd) setCurrentBreakpoint('md');
    else if (isLg) setCurrentBreakpoint('lg');
    else if (isXl) setCurrentBreakpoint('xl');
  }, [isXs, isSm, isMd, isLg, isXl]);

  return (
    <BreakpointContext.Provider value={{ currentBreakpoint, up, down, only, between }}>
      {children}
    </BreakpointContext.Provider>
  );
};

export const useBreakpoints = () => useContext(BreakpointContext);

export default BreakpointsProvider;
