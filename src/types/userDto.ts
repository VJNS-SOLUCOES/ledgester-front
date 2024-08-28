import { MenuDto } from './menuDto';

export type UserDto = {
  token: string;
  usuarioId: number;
  menu: MenuDto[];
};
