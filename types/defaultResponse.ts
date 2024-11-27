export type DefaultResponseDto<T> = {
  success: boolean;
  data: T;
  errors: ErrorDTO;
};

export type ErrorDTO = {
  message: string;
  stackTrace: string;
};
