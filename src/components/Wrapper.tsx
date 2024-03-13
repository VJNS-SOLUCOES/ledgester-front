import { IconButton } from '@mui/material';
import Logo from '../assets/realStateLogoDark.svg';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import { menuList } from '../helpers/menuList';
import { MenuOptions, Header } from './index';
import { useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export const Wrapper: React.FC<Props> = ({ children }) => {
  const [backButton, setBackButton] = useState<boolean>(false);

  return (
    <div className="h-screen flex">
      <header
        className="bg-primary relative w-20 overflow-hidden z-50 hover:animate-ripple"
        onMouseEnter={() => setBackButton(true)}
        onMouseLeave={() => setBackButton(false)}
      >
        <ul className="flex flex-col py-2 gap-6 w-[300px]">
          <li className="pl-2 flex items-center">
            <span className="pl-3 pr-2">
              <IconButton>
                {backButton ? (
                  <KeyboardBackspaceIcon fontSize="large" className="text-white" />
                ) : (
                  <ListOutlinedIcon fontSize="large" className="text-white" />
                )}
              </IconButton>
            </span>
            <img className="w-28 mx-7" src={Logo} alt="JSV" />
          </li>
          {menuList.map(element => (
            <MenuOptions key={element.key} description={element.title} menuIten={element.icon} />
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
