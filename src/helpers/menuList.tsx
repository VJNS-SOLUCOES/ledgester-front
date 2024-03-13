import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';

export const menuList = [
  {
    key: 1,
    icon: <SupervisedUserCircleOutlinedIcon fontSize="large" className="text-white" />,
    title: 'Gestão de Leads',
  },
  {
    key: 2,
    icon: <SimCardDownloadOutlinedIcon fontSize="large" className="text-white" />,
    title: 'Gestão de Documentos',
  },
  {
    key: 3,
    icon: <MapsHomeWorkOutlinedIcon fontSize="large" className="text-white" />,
    title: 'Gestão de Imóveis',
  },
  {
    key: 4,
    icon: <AttachMoneyIcon fontSize="large" className="text-white" />,
    title: 'Gestão Financeira',
  },
];
