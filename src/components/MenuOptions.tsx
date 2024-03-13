import { Typography } from '@mui/material';

type Props = {
  menuIten: React.ReactNode;
  description: string;
};

export const MenuOptions: React.FC<Props> = ({ menuIten, description }) => {
  return (
    <li className="pl-2 hover:bg-sky-700 hover:border-l-4 flex items-center gap-5 cursor-pointer">
      <span className="p-4 rounded-xl">{menuIten}</span>
      <Typography className="text-white">{description}</Typography>
    </li>
  );
};
