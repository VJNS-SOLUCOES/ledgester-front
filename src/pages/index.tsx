import React from 'react';
import { Wrapper, ContentBox, FavoriteBox } from '../components';
import 'chart.js/auto';
import { useAuth } from '../context/AuthContext';

const MainPage: React.FC = () => {
  const { user } = useAuth();

  return (
    <Wrapper>
      <ContentBox>
        <div className="flex flex-col gap-11">
          {/* <div className="flex flex-col">
            <h1 className="font-bold text-[32px] bg-white">Favoritos</h1>
            <h2 className="font-light text-black/70 text-sm">
              Acesso as funções mais acessadas do sistema
            </h2>
          </div>
          <div>
            <FavoriteBox description="Visão de dono" />
          </div> */}
        </div>
      </ContentBox>
    </Wrapper>
  );
};

export default MainPage;
