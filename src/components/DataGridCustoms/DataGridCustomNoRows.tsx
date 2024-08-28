import { GridOverlay } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import InboxIcon from '@mui/icons-material/Inbox';

export const DataGridCustomNoRows = () => {
  return (
    <GridOverlay className={`flex flex-col bg-white`}>
      <InboxIcon className={`text-8xl text-w-t60`} />
      <Typography className={`flex text-center font-medium text-w-t60 max-w-[240px]`}>
        Sem resultado de relatório para os filtros selecionados
      </Typography>
    </GridOverlay>
  );
};

export const DarkDataGridCustomNoRows = () => {
  return (
    <GridOverlay className="flex flex-col bg-d-two">
      <InboxIcon className="text-8xl text-[#999999]" />
      <Typography className="flex max-w-[240px] text-center font-medium text-[#999999]">
        Sem resultado de relatório para os filtros selecionados
      </Typography>
    </GridOverlay>
  );
};
