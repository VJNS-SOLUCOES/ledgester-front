import type { MenuDto } from './menu';

export type UserDto = {
  token: string;
  nome: string;
  sobrenome: string;
  nomeUsuario: string;
  email: string;
  menu: MenuDto[];
};
