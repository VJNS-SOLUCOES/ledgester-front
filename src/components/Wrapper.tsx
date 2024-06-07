import Logo from '../assets/logoHomeGyn.svg';
import FullLogo from '../assets/ligthLogo.svg';
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
        onMouseEnter={() => setMouseEnter(!mouseEnter)}
        onMouseLeave={() => setMouseEnter(!mouseEnter)}
      >
        <div
          className={`overflow-hidden ${expandedMenu ? 'w-[204px]' : 'w-[50px]'} ${
            !expandedMenu && mouseEnter && 'animate-ripple'
          }`}
        >
          <ul className="flex flex-col justify-center py-2 gap-4 w-[204px]">
            <li className="ml-[2px] flex mt-3 mb-6 items-center">
              {mouseEnter || expandedMenu ? (
                <img
                  className={`h-12 -mb-4 ${
                    expandedMenu ? 'w-[204px]' : mouseEnter && 'animate-ripple'
                  }`}
                  src={FullLogo}
                  alt="HomeGyn"
                />
              ) : (
                <img className="h-8" src={Logo} alt="HomeGyn" />
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
