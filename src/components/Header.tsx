import React, { useState } from 'react';
import { NavBar } from './index';
import NotificationsIcon from '@mui/icons-material/Notifications';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../context/AuthContext';

type Porps = {
  expandedMenu: boolean;
  setExpandedMenu: (value: boolean) => void;
};

export const Header: React.FC<Porps> = ({ expandedMenu, setExpandedMenu }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { logout } = useAuth();

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    logout();
  };
  return (
    <header className="h-16 flex w-full justify-between items-center bg-white">
      <div className="flex items-center">
        <IconButton
          onClick={() => setExpandedMenu(!expandedMenu)}
          sx={{
            '&.MuiIconButton-root': {
              marginX: '12px',
            },
          }}
        >
          <MenuIcon fontSize="medium" className="text-primary" />
        </IconButton>
        <NavBar />
      </div>
      <div className="flex h-5/6 px-4 gap-5 items-center">
        <NotificationsIcon fontSize="large" className="text-secondary" />
        <div className="flex items-center">
          <Typography>Samuel Santos</Typography>
          <Button id="basic-button" aria-haspopup="true" aria-expanded={open} onClick={handleClick}>
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
    </header>
  );
};
