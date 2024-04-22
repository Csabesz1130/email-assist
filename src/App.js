import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskList from './components/TaskList';
import CalendarView from './components/CalendarView';
import UserPreferences from './components/UserPreferences';

const App = () => {
  return (
    <Router>
      <div>
        <h1>Email Assistant</h1>
        <Switch>
          <Route exact path="/" component={TaskList} />
          <Route path="/calendar" component={CalendarView} />
          <Route path="/preferences" component={UserPreferences} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;