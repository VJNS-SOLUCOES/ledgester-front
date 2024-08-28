import { UserDto } from '../types';

export const handlePath = (description: string | null) => {
  const teste: UserDto = JSON.parse(localStorage.getItem('user')!);

  const result = teste.menu
    .map(element => {
      const matchingChildren = element.childrens.filter(
        children => children.desc_Funcao === description,
      );
      return matchingChildren.map(
        children => `${element.desc_Tab_Tipo_Funcao} > ${children.desc_Funcao}`,
      );
    })
    .flat();

  return result.toString();
};
