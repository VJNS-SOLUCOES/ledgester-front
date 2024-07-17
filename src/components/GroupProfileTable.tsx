import React, { useState } from 'react';
import { DataGrid, GridRowsProp, GridColDef } from '@mui/x-data-grid';
import { useQuery } from 'react-query';
import { ErrorDTO, GroupProfileTableDTO, GroupProfileTableRequestDTO } from '../types';
import { GroupProfileRequest } from '../services';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

type Props = {
  search: string;
  request: boolean;
  setRequest: (value: boolean) => void;
  groupProfileParams: GroupProfileTableRequestDTO;
};

export const GroupProfileTable: React.FC<Props> = ({
  request,
  groupProfileParams,
  search,
  setRequest,
}) => {
  const [data, setData] = useState<GroupProfileTableDTO[]>();

  const { isLoading } = useQuery(
    'groupProfileTable',
    () => GroupProfileRequest(groupProfileParams),
    {
      onSuccess: response => {
        setRequest(false);
        setData(response.data);
      },
      onError: (error: any) => {
        setRequest(false);
        if (error instanceof AxiosError) {
          const errors: ErrorDTO = error.response?.data.errors;
          if (errors.stackTrace !== '') {
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
    },
    {
      field: 'can_Save',
      headerName: 'Gravar',
      flex: 1,
      hideable: false,
    },
    {
      field: 'can_Delete',
      headerName: 'Excluir',
      flex: 1,
      hideable: false,
    },
    {
      field: '',
      headerName: 'Exeções',
      flex: 2,
      hideable: false,
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
        }}
      />
    </div>
  );
};
