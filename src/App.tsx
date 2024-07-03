import {
  DOCUMENTS_PAGE,
  FINANCIAL_PAGE,
  GROUP_REGISTRATION,
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
import { AuthContextProvider } from './context/AuthContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GroupRegistration from './pages/GroupRegistration';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastContainer autoClose={1500} theme="colored" />
      <ThemeProvider theme={theme}>
        <Router>
          <AuthContextProvider>
            <Routes>
              <Route path={LOGIN_PAGE} element={<LoginPage />} />
              <Route element={<ProtectedRoutes redirect={LOGIN_PAGE} />}>
                <Route path={MAIN_PAGE} element={<MainPage />} />
                <Route path={LEADS_PAGE} element={<MainPage />} />
                <Route path={DOCUMENTS_PAGE} element={<MainPage />} />
                <Route path={PROPERTIES_PAGE} element={<MainPage />} />
                <Route path={FINANCIAL_PAGE} element={<MainPage />} />
                <Route path={GROUP_REGISTRATION} element={<GroupRegistration />} />
              </Route>
            </Routes>
          </AuthContextProvider>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
