export type DefaultResponseDto<T> = {
  success: boolean;
  data: T;
  errors: ErrorDto;
};

export type ErrorDto = {
  message: string;
  stackTrace: string;
};
