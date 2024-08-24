import React, { useEffect, useState } from 'react';
import logo from '../assets/LEDGESTER_Logo1-Branco-transp.png';
import footerLogo from '../assets/LEDGESTER_Logo2-Transp.png';
import {
  Button,
  FormControl,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  FormHelperText,
  InputLabel,
} from '@mui/material';
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
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const LoginPage: React.FC = () => {
  const [request, setRequest] = useState<boolean>(false);
  const [visiblePassword, setVisiblePassword] = useState<boolean>(false);
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
        <img className="w-56 my-1 mx-6" src={logo} alt="LEDGESTER" />
      </header>
      <div className=" h-full flex justify-center items-center">
        <div className="bg-white flex flex-col w-1/4 max-w-md h-min rounded-xl ">
          <form className="px-12 py-6 gap-8 flex flex-col" onSubmit={handleSubmit(handleLogin)}>
            <div className="flex flex-col gap-3">
              <span className="bg-primary w-14 h-2" />
              <h1 className="text-2xl font-extrabold text-[#404040]">Login</h1>
            </div>
            <div className="flex-col flex gap-8 items-center">
              <FormControl className="flex w-full">
                <TextField
                  type="text"
                  {...register('email')}
                  label="E-mail"
                  fullWidth
                  variant="outlined"
                  error={!!errors.email}
                />
                <FormHelperText className="absolute -bottom-6" error id="accountId-error">
                  {errors.email?.message}
                </FormHelperText>
              </FormControl>
              <FormControl className="flex w-full">
                <InputLabel>Senha</InputLabel>
                <OutlinedInput
                  type={visiblePassword ? 'text' : 'password'}
                  label="Senha"
                  {...register('password')}
                  id="bootstrap-input"
                  error={!!errors.password}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setVisiblePassword(!visiblePassword)}
                        edge="end"
                      >
                        {visiblePassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FormHelperText className="absolute -bottom-6" error id="accountId-error">
                  {errors.password?.message}
                </FormHelperText>
              </FormControl>
            </div>
            <a className="hover:underline self-center cursor-pointer">Esqueci minha senha</a>
            <Button
              fullWidth
              className="h-10 self-center disabled:bg-primary !important"
              type="submit"
              variant="contained"
              disabled={isLoading}
              sx={{
                '&.MuiButton-root.Mui-disabled': {
                  backgroundColor: '#0078FF',
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
      <div className="bg-white flex justify-around items-center">
        <img className="h-[75px]" src={footerLogo} alt="LEDGESTER" />
        <span className="text-black/60 flex text-xs sm:gap-4 sm:text-sm text-center">
          <p>Copyright© 2024 VJNS®</p>
          <p>Todos os direitos reservados.</p>
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
