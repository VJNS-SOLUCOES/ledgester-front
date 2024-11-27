export type MenuDto = {
  tab_Tipo_Funcao: number;
  desc_Tab_Tipo_Funcao: string;
  icon: string;
  childrens: ChildrenDto[];
};

export type ChildrenDto = {
  funcaoId: number;
  desc_Funcao: string;
  rotaFront: string;
  icon_Funcao: string;
};
