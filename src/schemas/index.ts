import * as yup from 'yup';

export const loginSchema = yup.object({
  email: yup
    .string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i, 'O email é inválido')
    .required('O email é obrigatório')
    .max(100, 'O email deve ter no máximo 100 caracteres'),
  password: yup
    .string()
    .required('A senha é obrigatória')
    .min(10, 'A senha deve ter no mínimo 10 caracteres')
    .max(100, 'A senha deve ter no máximo 100 caracteres'),
});
