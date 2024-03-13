import React, { useEffect } from 'react';
import logo from '../assets/realStateLogoDark.svg';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MAIN_PAGE } from '../configs';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    localStorage.setItem('page', MAIN_PAGE);
    navigate(MAIN_PAGE);
  };

  useEffect(() => {
    localStorage.removeItem('page');
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-primary px-20 rounded-ee-full">
        <img className="w-28 my-3 mx-7" src={logo} alt="JSV" />
      </header>
      <div className=" h-full flex justify-center items-center">
        <div className="bg-white flex flex-col w-1/4 max-w-md h-min rounded-xl ">
          <form className="px-12 py-6 gap-8 flex flex-col">
            <div className="flex flex-col gap-3">
              <span className="bg-[#1976d2] w-14 h-2" />
              <h1 className="text-2xl font-extrabold text-[#404040]">Login</h1>
            </div>
            <div className="flex-col flex gap-8 items-center">
              <TextField type="text" label="E-mail" className="w-full" />
              <div className="flex-col flex gap-4 items-center w-full">
                <TextField type="password" label="Senha" className="w-full" />
                <a className="hover:underline cursor-pointer hover:text-[#1976d2]">
                  Esqueci minha senha
                </a>
              </div>
            </div>
            <Button
              onClick={() => handleLogin()}
              className="w-3/5 self-center"
              type="submit"
              variant="contained"
            >
              <span className="normal-case text-lg font-semibold">Entrar</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
