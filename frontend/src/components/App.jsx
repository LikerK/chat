import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';

import { Navbar, Button } from 'react-bootstrap';
import { useAuth } from '../hooks/index.jsx';
import LoginPage from './LoginPage.jsx';
import MainPage from './MainPage.jsx';
import AuthProvider from '../contexts/AuthProvider.jsx';
import '../index.css';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.user ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.user ? <Button variant="secondary" onClick={auth.logOut}>Log out</Button> : null
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Navbar className="shadow-sm" bg="white" expand="lg">
          <div className="container">
            <a href="/" className="navbar-brand">Chat</a>
            <AuthButton />
          </div>
        </Navbar>
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            )}
          />
          <Route path="login" element={<LoginPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
