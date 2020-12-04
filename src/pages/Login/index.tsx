import React, { useState } from 'react';
import BasicButton from '../../components/BasicButton';
import BasicInput from '../../components/BasicInput';
import UsersController from '../../controllers/Users/UsersController';
import './styles.css';

interface LoginPageProps {
  usersController: UsersController;
}

const Login: React.FC<LoginPageProps> = ({ usersController }) => {
  const [userName, setUserName] = useState('');

  const [password, setPassword] = useState('');

  const handleNewUserName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(event.target.value);
  };

  const handleNewPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    usersController.validateUserInfo(userName, password);
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
