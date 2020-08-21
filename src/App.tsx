import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Flux from './pages/Flux';

import DailyFluxController from './api/DailyFlux/DailyFluxController';
import CategoriesController from './api/Categories/CategoriesController';

function App() {
  const dailyFluxController = new DailyFluxController();
  const categoriesController = new CategoriesController();

  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/caixa">
        <Flux
          dailyFluxController={dailyFluxController}
          categoriesController={categoriesController}
        />
      </Route>
    </Switch>
  );
}

export default App;
