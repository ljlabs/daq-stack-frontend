import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Switch, Route } from 'react-router-dom';
import History from './modules/history/history';
import Process from './modules/process/process';
import Display from './modules/display/display';
import Header from './components/header/header';
import { routeConsts } from './constants/routes';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path={routeConsts.historyRoute} component={History}/>
        <Route exact path={routeConsts.processRoute} component={Process}/>
        <Route exact path={routeConsts.displayRoute + "/:id"} component={Display}/>
      </Switch>
    </div>
  );
}

export default App;
