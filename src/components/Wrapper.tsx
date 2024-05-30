import { IconButton } from '@mui/material';
import Logo from '../assets/realStateLogoDark.svg';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { menuList } from '../helpers/menuList';
import { MenuOptions, Header } from './index';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
  children: React.ReactNode;
};

export const Wrapper: React.FC<Props> = ({ children }) => {
  const [mouseEnter, setMouseEnter] = useState<boolean>(false);

  const navigate = useNavigate();

  return (
    <div className="h-screen flex">
      <header
        className={`bg-primary relative w-20 overflow-hidden z-50 ${
          mouseEnter && 'animate-ripple'
        }`}
        onMouseEnter={() => setMouseEnter(!mouseEnter)}
        onMouseLeave={() => setMouseEnter(!mouseEnter)}
      >
        <ul className="flex flex-col py-2 gap-6 w-[305px]">
          <li className="pl-2 flex items-center">
            <span className="pl-1 pr-2">
              <IconButton onClick={() => navigate(-1)}>
                {mouseEnter ? (
                  <KeyboardBackspaceIcon fontSize="large" className="text-white" />
                ) : (
                  <ListOutlinedIcon fontSize="large" className="text-white" />
                )}
              </IconButton>
            </span>
            <img className="w-28 mx-7" src={Logo} alt="HomeGyn" />
          </li>
          {menuList.map(element => (
            <MenuOptions
              key={element.key}
              description={element.title}
              menuIten={element.icon}
              mouseEnter={mouseEnter}
              route={element.route}
            />
          ))}
        </ul>
      </header>
      <div className="absolute flex-col w-full pl-20">
        <Header />
        {children}
      </div>
    </div>
  );
};
