import React from 'react';
import { FunctionChildrenDto } from '../types';
import { useNavigate } from 'react-router-dom';
import { Typography } from '@mui/material';
import { handleIcons } from '../utils';

type Props = {
  mouseEnter: boolean;
  pathname: string;
  functionsOptions: FunctionChildrenDto;
};

export const SubMenuOption: React.FC<Props> = ({ functionsOptions, mouseEnter, pathname }) => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    localStorage.setItem('function', functionsOptions.desc_Funcao);
    navigate(functionsOptions.rotaFront);
  };

  return (
    <div className="flex items-center">
      <button className="cursor-pointer w-full" onClick={() => handleNavigate()}>
        <div
          className={`pl-7 pr-3 active:animate-click hover:bg-black/30 ${
            functionsOptions.rotaFront === pathname && mouseEnter && 'bg-black/30'
          } flex items-center gap-3`}
        >
          {handleIcons(functionsOptions.icon_Funcao)}
          <Typography className="text-white py-1 text-start" fontSize={14}>
            {functionsOptions.desc_Funcao}
          </Typography>
        </div>
      </button>
    </div>
  );
};
