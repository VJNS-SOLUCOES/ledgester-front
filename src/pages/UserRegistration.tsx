import React, { useEffect, useState } from 'react';
import { ContentBox, Wrapper } from '../components';
import {
  Box,
  Button,
  Divider,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  TextField,
  ThemeProvider,
} from '@mui/material';
import { createUserRequest, funtionGroupsRequest } from '../services';
import { CreateUserDto, CreateUserGroupDto, ErrorDTO, FuntionGroup_TypeDTO } from '../types';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createUserSchema } from '../schemas';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import dayjs from 'dayjs';
import { createUserGroupRequest } from '../services/userGroupApi';
import registrationTheme from '../styles/registrationTheme';

const UserRegistration: React.FC = () => {
  const [functionGroups, setFunctionGroups] = useState<FuntionGroup_TypeDTO[]>([]);
  const [visiblePassword, setVisiblePassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [request, setRequest] = useState<boolean>(false);
  const [userGroupRequest, setUserGroupRequest] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [dateBirth, setDateBirth] = useState<DateValueType | null>(null);
  const [createUserGroupData, setCreateUserGroupData] = useState<CreateUserGroupDto>();

  const handleInitialRequest = async (): Promise<void> => {
    const [functionGroupsResponse] = await Promise.all([funtionGroupsRequest()]);
    setFunctionGroups(functionGroupsResponse.data);
  };

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CreateUserDto>({
    mode: 'onSubmit',
    resolver: yupResolver(createUserSchema),
  });

  const { isLoading } = useQuery('createUserRequest', () => createUserRequest(getValues()), {
    onSuccess: () => {
      setRequest(false);
      reset();
      setDateBirth(null);
      toast.success('Usuário cadastrado com sucesso!');
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

  useQuery('createUserGroupRequest', () => createUserGroupRequest(createUserGroupData!), {
    onSuccess: () => {
      setUserGroupRequest(false);
      toast.success('Grupo de usuário cadastrado com sucesso!');
    },
    onError: (error: any) => {
      setUserGroupRequest(false);
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
    enabled: userGroupRequest,
    retry: false,
  });

  const handleCreateUser: SubmitHandler<CreateUserDto> = () => {
    setRequest(true);
  };
  console.log(createUserGroupData);
  useEffect(() => {
    handleInitialRequest();
  }, []);

  return (
    <ThemeProvider theme={registrationTheme}>
      <Wrapper>
        <ContentBox>
          <div className="flex flex-col gap-6 h-full">
            <div className="flex flex-col h-full gap-4">
              <span>
                <h1 className="font-bold text-3xl">Cadastro de Usuário</h1>
                <h2 className="text-black/35">Cadastre um novo Usuário</h2>
              </span>
              <h3 className="font-bold text-xl">Dados do Usuário</h3>
              <form className="flex flex-col h-full" onSubmit={handleSubmit(handleCreateUser)}>
                <div className="flex w-full gap-14 h-full">
                  <div className="flex flex-col gap-8 w-1/2">
                    <div className="flex flex-col relative">
                      <InputLabel shrink>
                        <span className="flex items-center text-black/65 font-black gap-1">
                          <p className="uppercase">nome</p>
                          <p className="text-rose-600 text-lg">*</p>
                        </span>
                      </InputLabel>
                      <TextField
                        {...register('nome')}
                        placeholder="Insira o nome do usuário"
                        id="bootstrap-input"
                        error={!!errors.nome}
                      />
                      <FormHelperText className="absolute -bottom-6" error id="accountId-error">
                        {errors.nome?.message}
                      </FormHelperText>
                    </div>
                    <div className="flex flex-col relative">
                      <InputLabel shrink>
                        <span className="flex items-center text-black/65 font-black gap-1">
                          <p className="uppercase">sobrenome</p>
                          <p className="text-rose-600 text-lg">*</p>
                        </span>
                      </InputLabel>
                      <TextField
                        {...register('sobrenome')}
                        placeholder="Insira o sobrenome do usuário"
                        id="bootstrap-input"
                        error={!!errors.sobrenome}
                      />
                      <FormHelperText className="absolute -bottom-6" error id="accountId-error">
                        {errors.sobrenome?.message}
                      </FormHelperText>
                    </div>
                    <div className="flex flex-col relative">
                      <InputLabel shrink>
                        <span className="flex items-center text-black/65 font-black gap-1">
                          <p className="uppercase">data de nascimento</p>
                          <p className="text-rose-600 text-lg">*</p>
                        </span>
                      </InputLabel>
                      <Datepicker
                        primaryColor="sky"
                        popoverDirection="down"
                        showFooter={true}
                        asSingle={true}
                        useRange={false}
                        value={dateBirth}
                        configs={{
                          footer: {
                            cancel: 'Cancelar',
                            apply: 'Aplicar',
                          },
                        }}
                        onChange={newValue => {
                          setDateBirth(newValue);
                          newValue?.startDate
                            ? setValue(
                                'data_Nascimento',
                                dayjs(newValue?.startDate).format('YYYY-MM-DD'),
                              )
                            : reset({ data_Nascimento: '' });
                        }}
                        displayFormat="DD/MM/YYYY"
                        inputClassName="w-full border-[#cccccc90] border-2 rounded-md font-normal text-base hover:border-[#0048D9] p-2 "
                      />
                      <FormHelperText className="absolute -bottom-6" error id="accountId-error">
                        {errors.data_Nascimento?.message}
                      </FormHelperText>
                    </div>
                    <div className="flex items-end w-full gap-8">
                      <div className="w-3/4 flex flex-col relative">
                        <InputLabel shrink>
                          <span className="flex items-center text-black/65 font-black gap-1">
                            <p className="uppercase">grupo</p>
                            <p className="text-rose-600 text-lg">*</p>
                          </span>
                        </InputLabel>
                        <TextField
                          select
                          {...register('grupo_Usuario_Id')}
                          placeholder="Selecione o  grupo de permissionamento"
                          id="bootstrap-input"
                          error={!!errors.grupo_Usuario_Id}
                        >
                          <MenuItem value="">Limpar</MenuItem>
                          {functionGroups.map(element => (
                            <MenuItem key={element.id} value={element.id}>
                              {element.nome}
                            </MenuItem>
                          ))}
                        </TextField>
                        <FormHelperText className="absolute -bottom-6" error id="accountId-error">
                          {errors.grupo_Usuario_Id?.message}
                        </FormHelperText>
                      </div>
                      <Button
                        className="w-1/4 h-10"
                        variant="contained"
                        onClick={() => setOpenModal(true)}
                        sx={{
                          '&.MuiButton-root.Mui-disabled': {
                            backgroundColor: '#0D245E',
                          },
                        }}
                      >
                        Criar Grupo
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-8 w-1/2">
                    <div className="flex flex-col relative">
                      <InputLabel shrink>
                        <span className="flex items-center text-black/65 font-black gap-1">
                          <p className="uppercase">email</p>
                          <p className="text-rose-600 text-lg">*</p>
                        </span>
                      </InputLabel>
                      <TextField
                        {...register('email')}
                        placeholder="email@dominio.com"
                        id="bootstrap-input"
                        error={!!errors.email}
                      />
                      <FormHelperText className="absolute -bottom-6" error id="accountId-error">
                        {errors.email?.message}
                      </FormHelperText>
                    </div>
                    <div className="flex flex-col relative">
                      <InputLabel shrink>
                        <span className="flex items-center text-black/65 font-black gap-1">
                          <p className="uppercase">senha</p>
                          <p className="text-rose-600 text-lg">*</p>
                        </span>
                      </InputLabel>
                      <OutlinedInput
                        type={visiblePassword.password ? 'text' : 'password'}
                        {...register('senha')}
                        placeholder="Insira a senha"
                        id="bootstrap-input"
                        error={!!errors.senha}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setVisiblePassword({
                                  ...visiblePassword,
                                  password: !visiblePassword.password,
                                })
                              }
                              edge="end"
                            >
                              {visiblePassword.password ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText className="absolute -bottom-6" error id="accountId-error">
                        {errors.senha?.message}
                      </FormHelperText>
                    </div>
                    <div className="flex flex-col relative">
                      <InputLabel shrink>
                        <span className="flex items-center text-black/65 font-black gap-1">
                          <p className="uppercase">confirmação da senha</p>
                          <p className="text-rose-600 text-lg">*</p>
                        </span>
                      </InputLabel>
                      <OutlinedInput
                        type={visiblePassword.confirmPassword ? 'text' : 'password'}
                        {...register('confirmacaoSenha')}
                        placeholder="Confirme a senha"
                        id="bootstrap-input"
                        error={!!errors.confirmacaoSenha}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={() =>
                                setVisiblePassword({
                                  ...visiblePassword,
                                  confirmPassword: !visiblePassword.confirmPassword,
                                })
                              }
                              edge="end"
                            >
                              {visiblePassword.confirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                      <FormHelperText className="absolute -bottom-6" error id="accountId-error">
                        {errors.confirmacaoSenha?.message}
                      </FormHelperText>
                    </div>
                  </div>
                </div>
                <div className="justify-end flex">
                  <Button disabled={isLoading} type="submit" variant="outlined">
                    Salvar Cadastro
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </ContentBox>
      </Wrapper>
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-1/4 gap-6 bg-white rounded-md shadow-2xl py-4">
          <p className="text-2xl font-medium px-4">Cadastro de Grupo de Usuário</p>
          <Divider />
          <div className="flex flex-col px-4">
            <InputLabel shrink>
              <span className="flex items-center text-black/65 font-black gap-1">
                <p className="uppercase">nome</p>
                <p className="text-rose-600 text-lg">*</p>
              </span>
            </InputLabel>
            <TextField
              onChange={e =>
                setCreateUserGroupData({ ...createUserGroupData, name: e.target.value })
              }
              placeholder="Insira o nome do grupo de usuário"
              id="bootstrap-input"
              error={!!errors.nome}
            />
          </div>
          <Divider />
          <div className="flex px-4 gap-4">
            <Button
              sx={{
                borderRadius: 4,
              }}
              onClick={() => setOpenModal(false)}
              variant="outlined"
            >
              Cancelar
            </Button>
            <Button
              sx={{
                borderRadius: 4,
              }}
              variant="contained"
              disabled={createUserGroupData ? !createUserGroupData.name : true}
              onClick={() => {
                setUserGroupRequest(true);
              }}
            >
              Criar Grupo
            </Button>
          </div>
        </Box>
      </Modal>
    </ThemeProvider>
  );
};

export default UserRegistration;
