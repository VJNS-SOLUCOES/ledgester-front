import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import { DOCUMENTS_PAGE, FINANCIAL_PAGE, LEADS_PAGE, PROPERTIES_PAGE, MAIN_PAGE } from '../configs';

export const menuList = [
  {
    key: 1,
    icon: <DragIndicatorIcon fontSize="large" className="text-white rotate-90" />,
    title: 'Página Inicial',
    route: MAIN_PAGE,
  },
  {
    key: 2,
    icon: <SupervisedUserCircleOutlinedIcon fontSize="large" className="text-white" />,
    title: 'Gestão de Leads',
    route: LEADS_PAGE,
  },
  {
    key: 3,
    icon: <SimCardDownloadOutlinedIcon fontSize="large" className="text-white" />,
    title: 'Gestão de Documentos',
    route: DOCUMENTS_PAGE,
  },
  {
    key: 4,
    icon: <MapsHomeWorkOutlinedIcon fontSize="large" className="text-white" />,
    title: 'Gestão de Imóveis',
    route: PROPERTIES_PAGE,
  },
  {
    key: 5,
    icon: <AttachMoneyIcon fontSize="large" className="text-white" />,
    title: 'Gestão Financeira',
    route: FINANCIAL_PAGE,
  },
];
