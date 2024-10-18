import ThemeProvider from '@mui/material/styles/ThemeProvider';
import { ContentBox, Wrapper } from '../components';
import registrationTheme from '../styles/registrationTheme';
import { Button, InputLabel, TextField } from '@mui/material';
import InputMask from 'react-input-mask';

export const PersonRegistration: React.FC = () => {
  return (
    <ThemeProvider theme={registrationTheme}>
      <Wrapper>
        <ContentBox>
          <div className="flex flex-col gap-6 h-full">
            <div className="flex flex-col h-full gap-4">
              <span>
                <h1 className="font-bold text-3xl">Cadastro de Pessoa</h1>
                <h2 className="text-black/35">Cadastre uma nova Pessoa</h2>
              </span>
              <h3 className="font-bold text-xl">Dados do Pessoa</h3>
              <form className="flex flex-col h-full">
                <div className="flex w-full gap-14 h-full">
                  <div className="flex flex-col gap-8 w-1/2">
                    <div className="flex flex-col relative">
                      <InputLabel shrink>
                        <span className="flex items-center text-black/65 font-black gap-1">
                          <p className="uppercase">nome</p>
                          <p className="text-rose-600 text-lg">*</p>
                        </span>
                      </InputLabel>
                      <TextField placeholder="Insira o nome do usuário" id="bootstrap-input" />
                    </div>
                    <div className="flex flex-col relative">
                      <InputLabel shrink>
                        <span className="flex items-center text-black/65 font-black gap-1">
                          <p className="uppercase">email</p>
                          <p className="text-rose-600 text-lg">*</p>
                        </span>
                      </InputLabel>
                      <InputMask mask="(0)999 999 99 99" disabled={false} maskChar=" ">
                        <TextField />
                      </InputMask>
                    </div>
                    <div className="flex flex-col relative">
                      <InputLabel shrink>
                        <span className="flex items-center text-black/65 font-black gap-1">
                          <p className="uppercase">data de nascimento</p>
                          <p className="text-rose-600 text-lg">*</p>
                        </span>
                      </InputLabel>
                    </div>
                    <div className="flex items-end w-full gap-8">
                      <div className="w-full flex flex-col relative">
                        <InputLabel shrink>
                          <span className="flex items-center text-black/65 font-black gap-1">
                            <p className="uppercase">grupo</p>
                            <p className="text-rose-600 text-lg">*</p>
                          </span>
                        </InputLabel>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-8 w-1/2">
                    <div className="flex flex-col relative">
                      <InputLabel shrink>
                        <span className="flex items-center text-black/65 font-black gap-1">
                          <p className="uppercase">email</p>
                          <p className="text-rose-600 text-lg">*</p>
                        </span>
                      </InputLabel>
                      <TextField placeholder="email@dominio.com" id="bootstrap-input" />
                    </div>
                    <div className="flex flex-col relative">
                      <InputLabel shrink>
                        <span className="flex items-center text-black/65 font-black gap-1">
                          <p className="uppercase">senha</p>
                          <p className="text-rose-600 text-lg">*</p>
                        </span>
                      </InputLabel>
                    </div>
                    <div className="flex flex-col relative">
                      <InputLabel shrink>
                        <span className="flex items-center text-black/65 font-black gap-1">
                          <p className="uppercase">confirmação da senha</p>
                          <p className="text-rose-600 text-lg">*</p>
                        </span>
                      </InputLabel>
                    </div>
                    <div className="flex justify-end items-end h-full">
                      <span>
                        <Button type="submit" variant="contained">
                          Salvar Cadastro
                        </Button>
                      </span>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </ContentBox>
      </Wrapper>
    </ThemeProvider>
  );
};
