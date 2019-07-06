import React, { Component } from 'react';
import './App.css';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import LogIn from './components/LogIn';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainGame from './components/MainGame';
import CreateAccount from './components/CreateAccount';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: ''
    };
  }

  componentDidMount = () => {};
  render() {
    return (
      <Router>
        <Route path='/' exact component={LogIn} />
        <Route
          path='/game'
          exact
          component={props => (
            <MainGame userID={this.state.userid} logout={this.logout} />
          )}
        />
        <Route path='/createAccount' exact component={CreateAccount} />
      </Router>
    );
  }
}

export default DragDropContext(HTML5Backend)(App);
