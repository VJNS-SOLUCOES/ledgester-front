import { Typography } from '@mui/material';
import React from 'react';
import { useLocation } from 'react-router-dom';

export const NavBar: React.FC = () => {
  const { pathname } = useLocation();

  const handlePathName = () => {
    return pathname.substring(1).split('/').join(' > ');
  };

  return (
    <nav className="flex h-5/6 items-center w-5/6 gap-2">
      <Typography className="hover:underline cursor-pointer text-slate-500">
        {handlePathName()}
      </Typography>
    </nav>
  );
};
