import { UserDto } from './userDto';

export interface AuthContextType {
  user: UserDto | undefined;
  login: (data: UserDto) => void;
  logout: () => void;
}
