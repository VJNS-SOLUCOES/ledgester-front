import { Typography } from '@mui/material';
import React from 'react';
import { handlePath } from '../utils/handlePath';

export const NavBar: React.FC = () => {
  const pathOnStorage = localStorage.getItem('function');

  return (
    <nav className="flex h-5/6 items-center w-5/6 gap-2">
      <Typography className="text-slate-500">{handlePath(pathOnStorage)}</Typography>
    </nav>
  );
};
