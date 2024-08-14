import React, { useEffect, useState } from 'react';
import { ContentBox, Wrapper } from '../components';
import { Button, InputAdornment, MenuItem, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { GroupProfileTable } from '../components/GroupProfileTable';
import {
  FuntionGroup_TypeDTO,
  GroupProfileDTO,
  GroupProfileConfigurationDTO,
  GroupProfileTableRequestDTO,
} from '../types';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation } from 'react-router-dom';
import { funtionGroupsRequest, funtionTypesRequest, updateProfileGroupRequest } from '../services';
import { yupResolver } from '@hookform/resolvers/yup';
import { buildProfileGroupScreenSchema } from '../schemas';
import { useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { handleErros } from '../utils';

const GroupProfileRegistration: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [request, setRequest] = useState<boolean>(false);
  const [updateRequest, setUpdateRequest] = useState<boolean>(false);
  const [functionGroups, setFunctionGroups] = useState<FuntionGroup_TypeDTO[]>([]);
  const [functionTypes, setFunctionTypes] = useState<FuntionGroup_TypeDTO[]>([]);
  const [updateGroupProfileConfiguration, setUpdateGroupProfileConfiguration] = useState<
    GroupProfileConfigurationDTO[]
  >([]);

  const location = useLocation();
  const permitions = location.state as GroupProfileDTO;

  const queryClient = useQueryClient();

  const {
    register,
    getValues,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GroupProfileTableRequestDTO>({
    mode: 'onSubmit',
    resolver: yupResolver(buildProfileGroupScreenSchema),
  });

  useQuery('updateGroupProfile', () => updateProfileGroupRequest(updateGroupProfileConfiguration), {
    onSuccess: () => {
      setUpdateRequest(false);
      queryClient.refetchQueries({ queryKey: 'login', exact: true });
      queryClient.refetchQueries({ queryKey: 'serviceRequest', exact: true });
      queryClient.refetchQueries({ queryKey: 'groupProfileTable', exact: true });
      toast.success('Alterçãoes salvas!');
    },
    onError: (error: any) => {
      setRequest(false);
      handleErros(error);
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    enabled: updateRequest,
  });

  const handleInitialRequest = async (): Promise<void> => {
    const [functionGroupsResponse, functionTypesResponse] = await Promise.all([
      funtionGroupsRequest(),
      funtionTypesRequest(),
    ]);
    setFunctionGroups(functionGroupsResponse.data);
    setFunctionTypes(functionTypesResponse.data);
  };

  const handleRequest: SubmitHandler<GroupProfileTableRequestDTO> = () => {
    setRequest(true);
  };

  useEffect(() => {
    handleInitialRequest();
  }, []);
  return (
    <Wrapper>
      <ContentBox>
        <div className="flex flex-col gap-6 h-full">
          <div className="flex flex-col">
            <h1 className="font-bold text-[32px] bg-white">Perfil de Grupo</h1>
          </div>
          <form className="bg-white gap-5 flex-col flex" onSubmit={handleSubmit(handleRequest)}>
            <div className="flex justify-between">
              <div className=" w-1/2 gap-2 flex">
                <TextField
                  {...register('grupoUsuarioId')}
                  label="Grupo"
                  select
                  className="w-1/3 flex"
                  error={!!errors.grupoUsuarioId}
                  helperText={
                    errors.grupoUsuarioId && <small>{errors.grupoUsuarioId.message}</small>
                  }
                >
                  {functionGroups.map(element => (
                    <MenuItem
                      value={element.id}
                      onClick={() => setValue('nomeGrupoUsuario', element.nome)}
                    >
                      {element.nome}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  {...register('tabTipofuncao_Id')}
                  label="Função"
                  select
                  className="w-1/3 flex"
                  error={!!errors.tabTipofuncao_Id}
                  helperText={
                    errors.tabTipofuncao_Id && <small>{errors.tabTipofuncao_Id.message}</small>
                  }
                >
                  {functionTypes.map(element => (
                    <MenuItem value={element.id}>{element.nome}</MenuItem>
                  ))}
                </TextField>
                <Button variant="contained" type="submit" className="h-14">
                  Buscar
                </Button>
              </div>
              <div className="w-1/2 flex justify-end">
                <TextField
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  label="Função"
                  className="w-1/3"
                  onChange={event => setSearch(event.target.value)}
                />
              </div>
            </div>
          </form>
          <div className="flex h-full">
            <GroupProfileTable
              permitions={permitions}
              request={request}
              groupProfileParams={getValues()}
              search={search}
              setRequest={setRequest}
              setUpdateGroupProfileConfiguration={setUpdateGroupProfileConfiguration}
            />
          </div>
          <div className="flex gap-4">
            {permitions.permissao.can_Save && (
              <Button
                onClick={() => {
                  setUpdateRequest(true);
                }}
                disabled={updateGroupProfileConfiguration.length <= 0}
                variant="outlined"
                sx={{
                  borderRadius: 4,
                }}
              >
                Gravar
              </Button>
            )}
          </div>
        </div>
      </ContentBox>
    </Wrapper>
  );
};

export default GroupProfileRegistration;
