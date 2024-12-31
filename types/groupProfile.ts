export type GroupProfileDTO = {
  permissao: PermitionsDTO;
  particularidade: ParticularitiesDTO[];
};

export type PermitionsDTO = {
  can_Search: boolean;
  can_Save: boolean;
  can_Delete: boolean;
};

export type GroupProfileConfigurationDTO = {
  funcao_Id: number;
  grupoUsuarioId: number;
  can_Search: boolean;
  can_Save: boolean;
  can_Delete: boolean;
};

export type GroupProfileTableDTO = {
  funcao_Id: number;
  desc_Funcao: string;
  can_Search: boolean;
  can_Save: boolean;
  can_Delete: boolean;
  particularidade: ParticularitiesDTO[];
};

export type ParticularitiesDTO = {
  grupO_USUARIO_PARTICUL_ID: number;
  desc_parametro: string;
  presenca_particularidade: boolean;
};

export type InputParticularitiesDTO = {
  grupO_USUARIO_PARTICUL_ID: number;
  presenca_particularidade: boolean;
};

export type GroupProfileTableRequestDTO = {
  grupoUsuarioId: number;
  nomeGrupoUsuario?: string;
  tabTipofuncao_Id?: number;
};

export type FuntionGroup_TypeDTO = {
  id: number;
  nome: string;
};
