import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Game from './Game';
import axios from 'axios';

class MainGame extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: 0,
      logoutStatus: ''
    };
  }
  onResetclick = () => {
    this.setState({ gameId: this.state.gameId + 1 });
  };

  onLogoutClick = () => {
    axios.get('/users/logout').then(res => {
      this.setState({
        logoutStatus: res.data.data
      });
      if (res.data.data === 'LOGIN') {
        this.props.history.push('/');
      }
    });
  };

  render() {
    return (
      <div className='App'>
        <div className='container'>
          <Game
            key={this.state.gameId}
            onResetclick={this.onResetclick}
            onLogoutClick={this.onLogoutClick}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(MainGame);
