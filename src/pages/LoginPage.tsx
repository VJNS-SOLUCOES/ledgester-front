import React, { useEffect, useState } from 'react';
import logo from '../assets/realStateLogoDark.svg';
import { Button, TextField } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ErrorDTO, LoginDto } from '../types';
import { useQuery } from 'react-query';
import { authRequest } from '../services';
import { useAuth } from '../context/AuthContext';
import { loginSchema } from '../schemas';
import { ThreeDots } from 'react-loader-spinner';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const LoginPage: React.FC = () => {
  const [request, setRequest] = useState<boolean>(false);
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginDto>({
    mode: 'onSubmit',
    resolver: yupResolver(loginSchema),
  });

  const { isLoading } = useQuery('loginRequest', () => authRequest(getValues()), {
    onSuccess: response => {
      setRequest(false);
      login(response.data);
    },
    onError: (error: any) => {
      setRequest(false);
      if (error instanceof AxiosError) {
        const errors: ErrorDTO = error.response?.data.errors;
        if (error.response === undefined) {
          toast.error('Algo deu errado!');
        } else if (errors.message !== '') {
          toast.error(errors.message);
        } else {
          toast.warning(errors.stackTrace);
        }
      }
      error;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: request,
    retry: false,
  });

  const handleLogin: SubmitHandler<LoginDto> = () => {
    setRequest(true);
  };

  useEffect(() => {
    localStorage.removeItem('function');
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
            <Button
              className="w-3/5 h-10 self-center disabled:bg-primary !important"
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                '&.MuiButton-root.Mui-disabled': {
                  backgroundColor: '#0D245E',
                },
              }}
            >
              {isLoading ? (
                <ThreeDots
                  height="20"
                  width="54"
                  radius="9"
                  color="white"
                  ariaLabel="three-dots-loading"
                />
              ) : (
                <span className="normal-case text-lg font-semibold">Entrar</span>
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
