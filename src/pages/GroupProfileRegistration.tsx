import React, { useEffect, useState } from 'react';
import { ContentBox, Wrapper } from '../components';
import { Button, InputAdornment, MenuItem, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { GroupProfileTable } from '../components/GroupProfileTable';
import { GroupProfileTableRequestDTO } from '../types';
import { SubmitHandler, useForm } from 'react-hook-form';

const GroupProfileRegistration: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [request, setRequest] = useState<boolean>(false);

  const {
    register,
    getValues,
    handleSubmit,
    formState: {},
  } = useForm<GroupProfileTableRequestDTO>({
    mode: 'onSubmit',
  });

  const handleRequest: SubmitHandler<GroupProfileTableRequestDTO> = () => {
    setRequest(true);
  };

  return (
    <Wrapper>
      <ContentBox>
        <div className="flex flex-col gap-8 h-full">
          <div className="flex flex-col">
            <h1 className="font-bold text-[32px] bg-white">Perfil de Grupo</h1>
          </div>
          <form className="bg-white gap-5 flex-col flex" onSubmit={handleSubmit(handleRequest)}>
            <div className="flex justify-between">
              <div className=" w-1/2 gap-2 flex">
                <TextField
                  {...register('GrupoUsuarioId')}
                  label="Grupo"
                  select
                  className="w-1/3 flex"
                >
                  <MenuItem value={1}>ADM</MenuItem>
                </TextField>
                <TextField
                  {...register('TabTipoFuncaoId')}
                  label="Função"
                  select
                  className="w-1/3 flex"
                >
                  <MenuItem value={1}>ADM</MenuItem>
                </TextField>
                <Button variant="contained" type="submit">
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
                />
              </div>
            </div>
          </form>
          <GroupProfileTable
            request={request}
            groupProfileParams={getValues()}
            search={search}
            setRequest={setRequest}
          />
        </div>
      </ContentBox>
    </Wrapper>
  );
};

export default GroupProfileRegistration;
