import React from 'react';
import './App.css';
import { Switch, Route, Redirect, RouteProps } from 'react-router-dom';

import EntriesController from './controllers/Entries/EntriesController';
import CategoriesController from './controllers/Categories/CategoriesController';
import Categories from './pages/Categories';
import Home from './pages/Home';
import DailyReport from './pages/DailyReport';
import RegularExpenses from './pages/RegularExpenses';
import { HTTPClient } from './services/HTTPClient';
import Login from './pages/Login';
import UsersController from './controllers/Users/UsersController';

import { isAuthenticated, logout } from './services/AuthService';

export interface PrivateRouteProps extends RouteProps {
  isAuth: boolean; // is authenticate route
  redirectPath: string; // redirect path if don't authenticate route
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
  return props.isAuth ? (
    <Route {...props} component={props.component} render={undefined} />
  ) : (
    <Redirect to={{ pathname: props.redirectPath }} />
  );
};

interface AppProps {
  redirectHome: () => void;
}

const App: React.FC<AppProps> = ({ redirectHome }) => {
  const dbConnection = new HTTPClient();
  const entriesController = new EntriesController(dbConnection);
  const categoriesController = new CategoriesController(dbConnection);
  const usersController = new UsersController(dbConnection);

  return (
    <Switch>
      <PrivateRoute
        path="/"
        redirectPath="/login"
        isAuth={isAuthenticated()}
        exact
      >
        <Home />
      </PrivateRoute>
      <PrivateRoute
        path="/caixa"
        redirectPath="/login"
        isAuth={isAuthenticated()}
      >
        <DailyReport
          entriesController={entriesController}
          categoriesController={categoriesController}
        />
      </PrivateRoute>
      <PrivateRoute
        path="/categorias"
        redirectPath="/login"
        isAuth={isAuthenticated()}
      >
        <Categories categoriesController={categoriesController} />
      </PrivateRoute>
      <PrivateRoute
        path="/fixos"
        redirectPath="/login"
        isAuth={isAuthenticated()}
      >
        <RegularExpenses
          entriesController={entriesController}
          categoriesController={categoriesController}
        />
      </PrivateRoute>
      <Route path="/login">
        <Login usersController={usersController} redirectHome={redirectHome} />
      </Route>
      <Route path="/logout">
        {/* {logout()} */}
        <Redirect to="/login" />
      </Route>
    </Switch>
  );
};

export default App;
