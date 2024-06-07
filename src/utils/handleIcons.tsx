import SimCardDownloadOutlinedIcon from '@mui/icons-material/SimCardDownloadOutlined';
import MapsHomeWorkOutlinedIcon from '@mui/icons-material/MapsHomeWorkOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const iconMap: { [key: string]: React.ReactNode } = {
  DragIndicatorIcon: <DragIndicatorIcon fontSize="medium" className="text-white rotate-90" />,
  SupervisedUserCircleOutlinedIcon: (
    <SupervisedUserCircleOutlinedIcon fontSize="medium" className="text-white" />
  ),
  SimCardDownloadOutlinedIcon: (
    <SimCardDownloadOutlinedIcon fontSize="medium" className="text-white" />
  ),
  MapsHomeWorkOutlinedIcon: <MapsHomeWorkOutlinedIcon fontSize="medium" className="text-white" />,
  AttachMoneyIcon: <AttachMoneyIcon fontSize="medium" className="text-white" />,
  GroupAddIcon: <GroupAddIcon fontSize="medium" className="text-white" />,
};

export const handleIcons = (iconName: string): React.ReactNode | null => {
  return iconMap[iconName] || null;
};
