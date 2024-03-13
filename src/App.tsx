import { LOGIN_PAGE, MAIN_PAGE } from './configs';
import './styles/index.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ProtectedRoutes from './routes/ProtectedRoutes';
import MainPage from './pages';

function App() {
  return (
    <Router>
      <Routes>
        <Route path={LOGIN_PAGE} element={<LoginPage />} />
        <Route element={<ProtectedRoutes redirect={LOGIN_PAGE} />}>
          <Route path={MAIN_PAGE} element={<MainPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
