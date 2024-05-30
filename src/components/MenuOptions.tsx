import { Divider, Typography } from '@mui/material';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  menuIten: React.ReactNode;
  description: string;
  mouseEnter: boolean;
  route: string;
};

export const MenuOptions: React.FC<Props> = ({ menuIten, description, mouseEnter, route }) => {
  const [hidden, setHidden] = useState<boolean>(false);
  const { pathname } = useLocation();

  const navigate = useNavigate();

  return (
    <div
      className="flex items-center"
      onMouseEnter={() => setHidden(!hidden)}
      onMouseLeave={() => setHidden(!hidden)}
    >
      {(hidden || route === pathname) && (
        <Divider orientation="vertical" className="bg-white py-6 w-[3px]" />
      )}
      <button className="cursor-pointer w-full" onClick={() => navigate(route)}>
        <div className="pl-2 active:animate-click hover:bg-black/30 flex items-center gap-5">
          <span className={`p-3 ${route === pathname && !mouseEnter && 'bg-black/30'} rounded-xl`}>
            {menuIten}
          </span>
          <Typography className="text-white">{description}</Typography>
        </div>
      </button>
    </div>
  );
};
