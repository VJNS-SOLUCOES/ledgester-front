import React, { useState } from 'react';
import LogoDark from '../assets/realStateLogolight.svg';
import { NavBar } from './index';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Menu, MenuItem, Typography } from '@mui/material';

export const Header: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <header className="h-16 flex justify-center items-center bg-white">
      <div className="flex items-center w-[2470px]">
        <img className=" w-28 mx-5 border-slate-300" src={LogoDark} alt="JSV" />
        <NavBar />
        <div className="flex h-5/6 justify-end px-4 gap-5 items-center w-1/3">
          <NotificationsIcon fontSize="large" className="text-secondary" />
          <div className="flex items-center">
            <Typography>Samuel Santos</Typography>
            <Button
              id="basic-button"
              aria-haspopup="true"
              aria-expanded={open}
              onClick={handleClick}
            >
              <KeyboardArrowDownIcon />
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                'aria-labelledby': 'basic-button',
              }}
            >
              <MenuItem onClick={handleClose}>Gerenciar usuários</MenuItem>
              <MenuItem onClick={handleClose}>ALterar senha</MenuItem>
              <MenuItem onClick={handleClose}>Sair</MenuItem>
            </Menu>
          </div>
        </div>
      </div>
    </header>
  );
};
