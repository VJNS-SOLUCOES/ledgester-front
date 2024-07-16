export type GroupProfileDTO = {
  permissao: PermitionsDTO;
  particularidade: ParticularitiesDTO[];
};

export type GroupProfileTableDTO = {
  funcao_Id: number;
  desc_Funcao: string;
  permissao: PermitionsDTO;
  particularidade: ParticularitiesDTO[];
};

export type PermitionsDTO = {
  can_Search: boolean;
  can_Save: boolean;
  can_Delete: boolean;
};

export type ParticularitiesDTO = {
  grupO_USUARIO_PARTICUL_ID: number;
  desc_parametro: string;
  presenca_particularidade: boolean;
};

export type GroupProfileTableRequestDTO = {
  GrupoUsuarioId: number;
  TabTipoFuncaoId: number;
};
