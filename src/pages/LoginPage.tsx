import React, { useEffect, useState } from 'react';
import logo from '../assets/realStateLogoDark.svg';
import { Button, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { MAIN_PAGE } from '../configs';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { LoginDto } from '../types';
import { useQuery } from 'react-query';
import { authRequest } from '../services';
import { AxiosError } from 'axios';

const schema = yup.object({
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'O email é inválido')
    .required('O email é obrigatório')
    .max(100, 'O email deve ter no máximo 100 caracteres'),
  password: yup
    .string()
    .required('A senha é obrigatória')
    .min(10, 'A senha deve ter no mínimo 10 caracteres')
    .max(100, 'A senha deve ter no máximo 100 caracteres'),
});

const LoginPage: React.FC = () => {
  const [request, setRequest] = useState<boolean>(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginDto>({
    mode: 'onSubmit',
    resolver: yupResolver(schema),
  });

  useQuery('login', () => authRequest(getValues()), {
    onSuccess: data => {
      setRequest(false);
      localStorage.setItem('user', JSON.stringify(data));
      navigate(MAIN_PAGE);
    },
    onError: (error: any) => {
      setRequest(false);
      if (error instanceof AxiosError) {
        console.log(error);
      }
    },
    refetchOnWindowFocus: false,
    enabled: request,
    retry: false,
  });

  const handleLogin: SubmitHandler<LoginDto> = () => {
    setRequest(true);
  };

  useEffect(() => {
    localStorage.removeItem('user');
  }, []);

  return (
    <div className="h-screen flex flex-col">
      <header className="bg-primary px-20 rounded-ee-full">
        <img className="w-28 my-3 mx-7" src={logo} alt="JSV" />
      </header>
      <div className=" h-full flex justify-center items-center">
        <div className="bg-white flex flex-col w-1/4 max-w-md h-min rounded-xl ">
          <form className="px-12 py-6 gap-8 flex flex-col" onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-3">
              <span className="bg-[#1976d2] w-14 h-2" />
              <h1 className="text-2xl font-extrabold text-[#404040]">Login</h1>
            </div>
            <div className="flex-col flex gap-8 items-center">
              <TextField
                type="text"
                {...register('email')}
                label="E-mail"
                fullWidth
                variant="outlined"
                error={!!errors.email}
                helperText={errors.email && <small>{errors.email.message}</small>}
              />
              <div className="flex-col flex gap-4 items-center w-full">
                <TextField
                  type={'password'}
                  {...register('password')}
                  label="Senha"
                  fullWidth
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password && <small>{errors.password.message}</small>}
                />
                <a className="hover:underline cursor-pointer hover:text-[#1976d2]">
                  Esqueci minha senha
                </a>
              </div>
            </div>
            <Button className="w-3/5 self-center" type="submit" variant="contained">
              <span className="normal-case text-lg font-semibold">Entrar</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
