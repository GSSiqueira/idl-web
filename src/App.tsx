import React from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Flux from './pages/Flux';

function App() {
  return (
    <Switch>
      <Route path="/" component={Home} exact />
      <Route path="/caixa" component={Flux} />
    </Switch>
  );
}

export default App;
