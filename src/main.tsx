import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { StyledEngineProvider } from '@mui/material';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StyledEngineProvider>
    <App />
  </StyledEngineProvider>,
);
