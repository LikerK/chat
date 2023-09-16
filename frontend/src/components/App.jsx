import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from 'react-router-dom';
import useAuth from '../hooks/index.jsx';
import PageLogin from './PageLogin.jsx';
import PageMain from './PageMain.jsx';
import AuthProvider from '../contexts/AuthProvider.jsx';

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  const location = useLocation();
  return (
    auth.user ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="d-flex flex-column h-100">
        <Routes>
          <Route path="login" element={<PageLogin />} />
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <PageMain />
              </PrivateRoute>
            )}
          />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
