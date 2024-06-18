import React from 'react';

type Props = {
  children: React.ReactNode;
};

export const ContentBox: React.FC<Props> = ({ children }) => {
  return (
    <div className="bg-white justify-items-center mx-auto mt-4 w-[98%] max-w-[2430px] max-h-[1300px]  pl-11 pt-14 h-[calc(100vh-110px)] rounded-3xl shadow-xl">
      {children}
    </div>
  );
};
