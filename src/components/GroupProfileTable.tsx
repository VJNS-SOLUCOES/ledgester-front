import React, { SetStateAction, useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import {
  ErrorDTO,
  GroupProfileConfigurationDTO,
  GroupProfileDTO,
  GroupProfileTableDTO,
  GroupProfileTableRequestDTO,
} from '../types';
import { groupProfileRequest } from '../services';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { Checkbox } from '@mui/material';

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
          } else if (errors.stackTrace !== '') {
            toast.error(errors.stackTrace);
          } else {
            toast.warning(errors.message);
          }
        }
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

  const handleCheckboxChange = (
    row: GroupProfileTableDTO,
    field: string,
    checked: boolean,
    currentValue: boolean,
  ) => {
    setUpdateGroupProfileConfiguration((prevTeste: GroupProfileConfigurationDTO[]) => {
      if (checked !== currentValue) {
        const { particularidade, desc_Funcao, ...rest } = { ...row, [field]: checked };
        const exists = prevTeste.find(item => item.funcao_Id === row.funcao_Id);

        if (exists) {
          return prevTeste.map(item =>
            item.funcao_Id === row.funcao_Id ? { ...exists, [field]: checked } : item,
          );
        } else {
          return [...prevTeste, { ...rest, grupoUsuarioId: groupProfileParams.grupoUsuarioId }];
        }
      } else {
        return prevTeste.filter(item => item.funcao_Id !== row.funcao_Id);
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

        return (
          <Checkbox
            disabled={!permitions.permissao.can_Save}
            checked={checked}
            onChange={event => {
              setChecked(event.target.checked);
              handleCheckboxChange(row, 'can_Search', event.target.checked, row.can_Search);
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

        return (
          <Checkbox
            disabled={!permitions.permissao.can_Save}
            checked={checked}
            onChange={event => {
              setChecked(event.target.checked);
              handleCheckboxChange(row, 'can_Save', event.target.checked, row.can_Save);
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

        return (
          <Checkbox
            disabled={!permitions.permissao.can_Save}
            checked={checked}
            onChange={event => {
              setChecked(event.target.checked);
              handleCheckboxChange(row, 'can_Delete', event.target.checked, row.can_Delete);
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
        return (
          <>
            {row.particularidade.length < 1 ? (
              <p className="cursor-pointer hover:underline">Não há particularidades</p>
            ) : (
              <p className="font-bold hover:underline cursor-pointer active:underline">
                Há particularidades
              </p>
            )}
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
