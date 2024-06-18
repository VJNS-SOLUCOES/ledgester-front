import React from 'react';
import { ContentBox } from '../components';

const GroupRegistration: React.FC = () => {
  return (
    <ContentBox>
      <h1 className="text-2xl font-bold mb-6">Cadastro de Grupos de Usuário</h1>
      <br />
      <div className="flex items-center w-full">
        <form className=" bg-white w-[97%]">
          <div className="mb-4 w-full">
            <label htmlFor="groupName" className="block text-gray-700 text-sm font-bold mb-2">
              Nome do Grupo:
            </label>
            <input
              type="text"
              id="groupName"
              name="groupName"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4 w-full">
            <label htmlFor="codGroup" className="block text-gray-700 text-sm font-bold mb-2">
              Código do Grupo:
            </label>
            <input
              type="text"
              id="codGroup"
              name="codGroup"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-6 w-full">
            <label htmlFor="observacoes" className="block text-gray-700 text-sm font-bold mb-2">
              Observações:
            </label>
            <input
              type="text"
              id="observacoes"
              name="observacoes"
              className="shadow appearance-none border h-90 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className=" w-100 bg-slate-950 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </ContentBox>
  );
};

export default GroupRegistration;
