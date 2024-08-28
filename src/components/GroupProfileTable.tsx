import React, { SetStateAction, useEffect, useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useQuery, useQueryClient } from 'react-query';
import {
  ErrorDTO,
  GroupProfileConfigurationDTO,
  GroupProfileDTO,
  GroupProfileTableDTO,
  GroupProfileTableRequestDTO,
  InputParticularitiesDTO,
  ParticularitiesDTO,
} from '../types';
import { groupProfileRequest, particularitiesUpdateProfileGroupRequest } from '../services';
import { Box, Button, Checkbox, Divider, Modal } from '@mui/material';
import { firstCapitalLetters } from '../utils';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { useAuth } from '../context/AuthContext';

type Props = {
  search: string;
  request: boolean;
  permitions: GroupProfileDTO;
  setRequest: (value: boolean) => void;
  groupProfileParams: GroupProfileTableRequestDTO;
  setUpdateGroupProfileConfiguration: (
    value: SetStateAction<GroupProfileConfigurationDTO[]>,
  ) => void;
};

export const GroupProfileTable: React.FC<Props> = ({
  request,
  permitions,
  groupProfileParams,
  search,
  setRequest,
  setUpdateGroupProfileConfiguration,
}) => {
  const [data, setData] = useState<GroupProfileTableDTO[]>();
  const [particularitiesUpdateRequest, setParticularitiesUpdateRequest] = useState<boolean>(false);
  const [inputParticularities, setInputParticularities] = useState<InputParticularitiesDTO[]>([]);

  const { logout } = useAuth();

  const queryClient = useQueryClient();

  useQuery(
    'particularitiesUpdate',
    () => particularitiesUpdateProfileGroupRequest(inputParticularities),
    {
      onSuccess: () => {
        setParticularitiesUpdateRequest(false);
        setInputParticularities([]);
        queryClient.refetchQueries('groupProfileTable');
        toast.success('Alterçãoes salvas!');
      },
      onError: (error: any) => {
        setRequest(false);
        if (error instanceof AxiosError) {
          const errors: ErrorDTO = error.response?.data.errors;
          if (error.response === undefined) {
            toast.error('Algo deu errado!');
          } else if (errors.message !== '') {
            toast.error(errors.message);
            if (error.response.status === 401) logout();
          } else {
            toast.warning(errors.stackTrace);
          }
        }
        error;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      enabled: particularitiesUpdateRequest,
    },
  );

  const { isLoading } = useQuery(
    'groupProfileTable',
    () => groupProfileRequest(groupProfileParams),
    {
      onSuccess: response => {
        setRequest(false);
        setData(response.data);
      },
      onError: (error: any) => {
        setRequest(false);
        if (error instanceof AxiosError) {
          const errors: ErrorDTO = error.response?.data.errors;
          if (error.response === undefined) {
            toast.error('Algo deu errado!');
          } else if (errors.message !== '') {
            toast.error(errors.message);
            if (error.response.status === 401) logout();
          } else {
            toast.warning(errors.stackTrace);
          }
        }
        error;
      },
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      enabled: request,
    },
  );

  const filtered = data?.filter(element => {
    if (search.length > 2) {
      const searchLower = search.toLowerCase();

      return element.desc_Funcao.toLowerCase().includes(searchLower);
    }
    return data;
  });

  const handleParticularitiesCheckboxChange = (
    particularity: ParticularitiesDTO,
    checked: boolean,
  ) => {
    setInputParticularities((prevTeste: InputParticularitiesDTO[]) => {
      const { desc_parametro, ...rest } = {
        ...particularity,
        presenca_particularidade: checked,
      };

      const exists = prevTeste.find(
        item => item.grupO_USUARIO_PARTICUL_ID === particularity.grupO_USUARIO_PARTICUL_ID,
      );
      if (exists) {
        if (particularity.presenca_particularidade === rest.presenca_particularidade) {
          return prevTeste.filter(
            item => item.grupO_USUARIO_PARTICUL_ID !== particularity.grupO_USUARIO_PARTICUL_ID,
          );
        }

        return prevTeste.map(item =>
          item.grupO_USUARIO_PARTICUL_ID === particularity.grupO_USUARIO_PARTICUL_ID
            ? { ...exists, presenca_particularidade: checked }
            : item,
        );
      } else {
        return [...prevTeste, { ...rest }];
      }
    });
  };

  const handleCheckboxChange = (row: GroupProfileTableDTO, field: string, checked: boolean) => {
    setUpdateGroupProfileConfiguration((prevTeste: GroupProfileConfigurationDTO[]) => {
      const { particularidade, desc_Funcao, ...rest } = { ...row, [field]: checked };

      const exists = prevTeste.find(item => item.funcao_Id === row.funcao_Id);
      if (exists) {
        const newValue = { ...exists, [field]: checked };
        const isDifferent = Object.keys(newValue)
          .slice(0, 4)
          .map(key => {
            return newValue[key as keyof typeof newValue] !== row[key as keyof typeof row];
          });

        if (isDifferent.every(value => value === false)) {
          return prevTeste.filter(item => item.funcao_Id !== row.funcao_Id);
        }

        return prevTeste.map(item =>
          item.funcao_Id === row.funcao_Id ? { ...exists, [field]: checked } : item,
        );
      } else {
        return [...prevTeste, { ...rest, grupoUsuarioId: groupProfileParams.grupoUsuarioId }];
      }
    });
  };

  const rows: GridRowsProp = filtered as GroupProfileTableDTO[];

  const columns: GridColDef[] = [
    {
      field: 'desc_Funcao',
      headerName: 'Função',
      flex: 2,
      hideable: false,
    },
    {
      field: 'can_Search',
      headerName: 'Consulta',
      flex: 1,
      hideable: false,
      renderCell: ({ row }) => {
        const [checked, setChecked] = useState<boolean>(row.can_Search);

        useEffect(() => {
          setChecked(row.can_Search);
          setUpdateGroupProfileConfiguration([]);
        }, [request]);

        return (
          <Checkbox
            disabled={!permitions.permissao.can_Save}
            checked={checked}
            onChange={event => {
              setChecked(event.target.checked);
              handleCheckboxChange(row, 'can_Search', event.target.checked);
            }}
          />
        );
      },
    },
    {
      field: 'can_Save',
      headerName: 'Gravar',
      flex: 1,
      hideable: false,
      renderCell: ({ row }) => {
        const [checked, setChecked] = useState<boolean>(row.can_Save);

        useEffect(() => {
          setChecked(row.can_Save);
          setUpdateGroupProfileConfiguration([]);
        }, [request]);

        return (
          <Checkbox
            disabled={!permitions.permissao.can_Save}
            checked={checked}
            onChange={event => {
              setChecked(event.target.checked);
              handleCheckboxChange(row, 'can_Save', event.target.checked);
            }}
          />
        );
      },
    },
    {
      field: 'can_Delete',
      headerName: 'Excluir',
      flex: 1,
      hideable: false,
      renderCell: ({ row }) => {
        const [checked, setChecked] = useState<boolean>(row.can_Delete);

        useEffect(() => {
          setChecked(row.can_Delete);
          setUpdateGroupProfileConfiguration([]);
        }, [request]);

        return (
          <Checkbox
            disabled={!permitions.permissao.can_Save}
            checked={checked}
            onChange={event => {
              setChecked(event.target.checked);
              handleCheckboxChange(row, 'can_Delete', event.target.checked);
            }}
          />
        );
      },
    },
    {
      field: '_',
      headerName: 'Exeções',
      flex: 2,
      hideable: false,
      renderCell: ({ row }: { row: GroupProfileTableDTO }) => {
        const [open, setOpen] = useState(false);

        return (
          <>
            {row.particularidade.length < 1 ? (
              <p className="font-bold text-black/40 cursor-default">Não há particularidades</p>
            ) : (
              <p
                className="font-bold hover:underline cursor-pointer active:underline"
                onClick={() => setOpen(true)}
              >
                Há particularidades
              </p>
            )}
            <Modal
              open={open}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col w-1/4 gap-4 bg-white rounded-md shadow-2xl py-4">
                <p className="text-2xl font-medium px-4">Cadastro de Perfil de Grupo</p>
                <Divider />
                <span className="text-black/80 px-4 font-normal flex min-h-60 flex-col gap-3">
                  <span>
                    <p>Nome do Grupo: {groupProfileParams.nomeGrupoUsuario}</p>
                    <p>Nome da Função: {row.desc_Funcao}</p>
                  </span>
                  <span className=" flex items-center gap-2">
                    {row.particularidade.map(particularity => {
                      const [checked, setChecked] = useState<boolean>(
                        particularity.presenca_particularidade,
                      );

                      return (
                        <>
                          <Checkbox
                            disabled={!permitions.permissao.can_Save}
                            checked={checked}
                            onChange={event => {
                              setChecked(event.target.checked);
                              handleParticularitiesCheckboxChange(
                                particularity,
                                event.target.checked,
                              );
                            }}
                          />
                          <p className="text-black/50">
                            {firstCapitalLetters(particularity.desc_parametro)}
                          </p>
                        </>
                      );
                    })}
                  </span>
                </span>
                <Divider />
                <div className="flex px-4 gap-4">
                  {permitions.permissao.can_Save && (
                    <Button
                      disabled={inputParticularities.length <= 0}
                      onClick={() => setParticularitiesUpdateRequest(true)}
                      variant="contained"
                      sx={{
                        borderRadius: 4,
                      }}
                    >
                      Gravar
                    </Button>
                  )}
                  <Button
                    onClick={() => setOpen(false)}
                    variant="outlined"
                    sx={{
                      borderRadius: 4,
                    }}
                  >
                    Cancelar
                  </Button>
                </div>
              </Box>
            </Modal>
          </>
        );
      },
    },
  ];

  return (
    <div className="h-full w-full">
      <DataGrid
        disableColumnMenu
        density="compact"
        getRowId={row => row.funcao_Id}
        isCellEditable={() => false}
        loading={isLoading}
        columns={columns}
        rows={!isLoading ? rows : []}
        sx={{
          '& .hideRightSeparator > .MuiDataGrid-columnSeparator': {
            display: 'none',
          },
          '& .MuiDataGrid-columnHeader:focus-within': {
            outline: 'none',
          },
          '& .MuiDataGrid-cell:focus-within': {
            outline: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            scrollbarWidth: 'auto',
          },
          '& .MuiDataGrid-row.Mui-selected:hover': {
            backgroundColor: '#FFFFFF',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: '#FFFFFF',
          },
          '& .MuiDataGrid-row.Mui-selected': {
            backgroundColor: '#FFFFFF',
          },
          '& .MuiDataGrid-selectedRowCount': {
            visibility: 'hidden',
          },
        }}
      />
    </div>
  );
};
