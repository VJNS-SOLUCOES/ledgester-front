import { UserDto } from './userDto';

export type AuthContextType = {
  user: UserDto | undefined;
  login: (data: UserDto) => void;
  logout: () => void;
};
