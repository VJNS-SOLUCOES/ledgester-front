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
        className="bg-primary relative z-50 w-auto"
        onMouseEnter={() => setMouseEnter(true)}
        onMouseLeave={() => setMouseEnter(false)}
      >
        <div
          className={`overflow-hidden ${expandedMenu ? 'w-[204px]' : 'w-[50px]'} ${
            !expandedMenu && mouseEnter && 'animate-ripple'
          }`}
        >
          <ul className="flex flex-col justify-center w-[204px]">
            <li className="h-[50px] flex mt-[5px] mb-6 items-center">
              {mouseEnter || expandedMenu ? (
                <img className="h-[50px] animate-toRight" src={FullLogo} alt="LEDGESTER" />
              ) : (
                <img className="h-[33px] -translate-y-[0.5px] ml-2" src={Logo} alt="LEDGESTER" />
              )}
            </li>
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
          </ul>
        </div>
      </nav>
      <Header expandedMenu={expandedMenu} setExpandedMenu={setExpandedMenu} />
      <div className="absolute flex-col mt-16 w-full pl-12">{children}</div>
    </div>
  );
};
