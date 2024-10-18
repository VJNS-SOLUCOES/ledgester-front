import Logo from '../assets/LEDGESTER_Simbolo-Branco.png';
import FullLogo from '../assets/LEDGESTER_Logo1-Branco-transp.png';
import { MenuOptions, Header } from './index';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

type Props = {
  children: React.ReactNode;
};

export const Wrapper: React.FC<Props> = ({ children }) => {
  const [mouseEnter, setMouseEnter] = useState<boolean>(false);
  const [expandedMenu, setExpandedMenu] = useState<boolean>(false);
  const { user } = useAuth();

  return (
    <div className="h-screen flex">
      <nav
        className="bg-primary relative z-50 w-auto flex"
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        <div
          className={`overflow-hidden h-full flex flex-col gap-2 ${
            expandedMenu || mouseEnter ? 'animate-ripple' : 'animate-rippleReverse'
          }`}
        >
          <div className="h-[65px] flex items-center">
            <img
              className={mouseEnter || expandedMenu ? 'h-[50px] animate-toRight' : 'hidden'}
              src={FullLogo}
              alt="LEDGESTER"
            />
            <img
              className={mouseEnter || expandedMenu ? 'hidden' : 'h-[33px] ml-2'}
              src={Logo}
              alt="LEDGESTER"
            />
          </div>
          <div className="flex flex-col h-full relative gap-3 w-[270px]">
            {user?.menu.map(element => (
              <MenuOptions
                key={element.tab_Tipo_Funcao}
                expandedMenu={expandedMenu}
                description={element.desc_Tab_Tipo_Funcao}
                menuIcon={element.icon}
                mouseEnter={mouseEnter}
                childrens={element.childrens}
              />
            ))}
          </div>
        </div>
      </nav>
      <Header expandedMenu={expandedMenu} setExpandedMenu={setExpandedMenu} />
      <div className="absolute flex-col mt-16 w-full pl-12">{children}</div>
    </div>
  );
};
