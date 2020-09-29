import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import EntriesController from './controllers/Entries/EntriesController';
import CategoriesController from './controllers/Categories/CategoriesController';
import Categories from './pages/Categories';
import Home from './pages/Home';
import DailyReport from './pages/DailyReport';
import RegularExpenses from './pages/RegularExpenses';
import { HTTPClient } from './services/HTTPClient';

function App() {
  const dbConnection = new HTTPClient();
  const entriesController = new EntriesController(dbConnection);
  const categoriesController = new CategoriesController(dbConnection);

  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/caixa">
        <DailyReport
          entriesController={entriesController}
          categoriesController={categoriesController}
        />
      </Route>
      <Route path="/categorias">
        <Categories categoriesController={categoriesController} />
      </Route>
      <Route path="/fixos">
        <RegularExpenses
          entriesController={entriesController}
          categoriesController={categoriesController}
        />
      </Route>
    </Switch>
  );
}

export default App;
