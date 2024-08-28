import { BsPersonFillLock } from 'react-icons/bs';
import { MdOutlinePostAdd, MdPersonAddAlt1, MdGroupAdd } from 'react-icons/md';
import { RiMoneyDollarCircleLine } from 'react-icons/ri';
import { CgFileDocument } from 'react-icons/cg';

const iconMap: { [key: string]: React.ReactNode } = {
  MdOutlinePostAdd: <MdOutlinePostAdd className="text-white text-2xl" />,
  CgFileDocument: <CgFileDocument className="text-white text-2xl" />,
  MdPersonAddAlt1: <MdPersonAddAlt1 className="text-white text-lg" />,
  MdGroupAdd: <MdGroupAdd className="text-white text-lg" />,
  RiMoneyDollarCircleLine: <RiMoneyDollarCircleLine className="text-white text-2xl" />,
  BsPersonFillLock: <BsPersonFillLock className="text-white text-xl" />,
};

export const handleIcons = (iconName: string): React.ReactNode | null => {
  return iconMap[iconName] || null;
};
