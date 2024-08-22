export type LoginDto = {
  email: string;
  password: string;
};

export type CreateUserDto = {
  email: string;
  senha: string;
  confirmacaoSenha: string;
  nome: string;
  sobrenome: string;
  data_Nascimento: string;
  grupo_Usuario_Id: number;
};
