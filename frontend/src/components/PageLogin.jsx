import {
  useState,
  useRef,
  useEffect,
} from 'react';
import { useFormik } from 'formik';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import useAuth from '../hooks/index.jsx';
import routes from '../routes';
import loginImage from '../assets/logIn.jpeg';

const PageLogin = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [authFailed, setAuthFailed] = useState(false);

  //  -.-  //
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  //  -.-  //
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setAuthFailed(false);
      try {
        const res = await axios.post(routes.loginPath(), values);
        localStorage.setItem('user', JSON.stringify(res.data));
        auth.logIn();
        console.log(localStorage);
        const { from } = location.state;
        navigate(from);
      } catch (error) {
        if (!error.isAxiosError) {
          console.log(error);
        }
        if (error.response?.status === 401) {
          setAuthFailed(true);
          console.log(error);
        } else {
          console.log(error);
        }
      }
    },
  });
  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <Card>
            <Card.Body className="row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={loginImage} className="rounded-circle" alt="" />
              </div>
              <Form onSubmit={formik.handleSubmit} className="col-12 col-md-6 mt-3 mt-mb-0">
                <h1 className="text-center mb-4">Войти</h1>
                <Form.Group className="mb-4 form-floating">
                  <Form.Control
                    name="username"
                    placeholder="Ваш ник"
                    id="username"
                    onChange={formik.handleChange}
                    className="form-control"
                    value={formik.values.username}
                    isInvalid={authFailed}
                    ref={inputRef}
                    required
                  />
                  <Form.Label htmlFor="username">username</Form.Label>
                </Form.Group>
                <Form.Group className="mb-4 form-floating">
                  <Form.Control
                    name="password"
                    placeholder="Пароль"
                    type="password"
                    id="password"
                    onChange={formik.handleChange}
                    className="form-control"
                    isInvalid={authFailed}
                    value={formik.values.password}
                    required
                  />
                  <Form.Label htmlFor="password">password</Form.Label>
                </Form.Group>
                <Button variant="outline-primary" className="w-100 mb-3" type="submit">
                  Войти
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
