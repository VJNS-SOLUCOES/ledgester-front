import { Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

type Props = {
  menuIten: React.ReactNode;
  description: string;
  mouseEnter: boolean;
  route: string;
};

export const MenuOptions: React.FC<Props> = ({ menuIten, description, mouseEnter, route }) => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  return (
    <button className="hover:border-l-4 cursor-pointer" onClick={() => navigate(route)}>
      <div className="pl-2 active:animate-click hover:bg-black/30 flex items-center gap-5">
        <span className={`p-3 ${route === pathname && !mouseEnter && 'bg-black/30'} rounded-xl`}>
          {menuIten}
        </span>
        <Typography className="text-white">{description}</Typography>
      </div>
    </button>
  );
};
