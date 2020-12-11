import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import BasicButton from '../../components/BasicButton';
import BasicInput from '../../components/BasicInput';
import UsersController from '../../controllers/Users/UsersController';
import { isAuthenticated, login, logout } from '../../services/AuthService';
import './styles.css';

interface LoginPageProps {
  usersController: UsersController;
  redirectHome: () => void;
}

const Login: React.FC<LoginPageProps> = ({ usersController, redirectHome }) => {
  const history = useHistory();

  const [loginStatusMessage, setLoginStatusMessage] = useState('');

  const [userName, setUserName] = useState('');

  const [password, setPassword] = useState('');

  useEffect(() => {
    logout();
  }, []);

  const handleNewUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = await usersController.validateUserInfo(userName, password);
    if (data.username) {
      login(data.authtoken);
      redirectHome();
      //setLoginStatusMessage(data.message);
    } else {
      setLoginStatusMessage(data.message);
    }
  };

  return (
    <>
      <main className="login-page-main container">
        <h1 className="main-title">IDL Manager</h1>
        <section className="login-content">
          <form onSubmit={handleSubmit}>
            <h2 className="secondary-title">Log In</h2>
            <p className="content-text">
              Digite o nome de usuário e senha para fazer log in:
            </p>
            <p className="status-message">{loginStatusMessage}</p>
            <BasicInput
              type="text"
              name="login-username"
              label="Username: "
              value={userName}
              handleNewValue={handleNewUserName}
              required
            />
            <BasicInput
              type="password"
              name="login-password"
              label="Password: "
              value={password}
              handleNewValue={handleNewPassword}
              required
            />
            <BasicButton
              label="Enviar"
              name="submit-button"
              type="submit"
            ></BasicButton>
          </form>
        </section>
      </main>
    </>
  );
};

export default Login;
