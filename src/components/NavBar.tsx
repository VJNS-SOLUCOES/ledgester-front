import { Typography } from '@mui/material';
import React from 'react';

export const NavBar: React.FC = () => {
  const pathOnStorage = localStorage.getItem('function');

  return (
    <nav className="flex h-5/6 items-center w-5/6 gap-2">
      <Typography className="hover:underline cursor-pointer text-slate-500">
        {pathOnStorage}
      </Typography>
    </nav>
  );
};
