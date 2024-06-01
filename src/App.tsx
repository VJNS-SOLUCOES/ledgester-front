import {
  DOCUMENTS_PAGE,
  FINANCIAL_PAGE,
  LEADS_PAGE,
  LOGIN_PAGE,
  MAIN_PAGE,
  PROPERTIES_PAGE,
} from './configs';
import './styles/index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProtectedRoutes from './routes/ProtectedRoutes';
import MainPage from './pages';
import theme from './styles/theme';
import { ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Router>
          <Routes>
            <Route path={LOGIN_PAGE} element={<LoginPage />} />
            <Route element={<ProtectedRoutes redirect={LOGIN_PAGE} />}>
              <Route path={MAIN_PAGE} element={<MainPage />} />
              <Route path={LEADS_PAGE} element={<MainPage />} />
              <Route path={DOCUMENTS_PAGE} element={<MainPage />} />
              <Route path={PROPERTIES_PAGE} element={<MainPage />} />
              <Route path={FINANCIAL_PAGE} element={<MainPage />} />
            </Route>
          </Routes>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
