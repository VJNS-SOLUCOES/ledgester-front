import { ErrorDTO } from './errorDto';

export type DefaultResponseDto<T> = {
  success: boolean;
  data: T;
  errors: ErrorDTO;
};
