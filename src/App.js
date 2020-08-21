import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './component/Home';
import NewUser from './component/NewUser'
import updateUser from './component/updateUser'

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/new" exact component={NewUser} />
      <Route path="/update" exact component={updateUser} />
    </Router>
  );
}

export default App;
