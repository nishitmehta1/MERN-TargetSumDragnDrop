import React, { Component } from 'react';
import TargetSum from './TargetSum';
import { withRouter } from 'react-router-dom';
import NumberOptions from './NumberOptions';
import shuffle from 'lodash.shuffle';
import axios from 'axios';

axios.defaults.withCredentials = true;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      randomNumbers: [],
      selectedNumbers: [],
      currentSum: 0,
      currentTargetIsEqual: '',
      userid: '',
      name: '',
      profilepic: ''
    };
  }

  componentDidMount() {
    axios.get('/users', { withCredentials: true }).then(res => {
      console.log(res.data.data);
      if (res.data.data === 'LOGGEDIN') {
        this.setState({
          userid: res.data.userId,
          name: res.data.name,
          profilepic: res.data.profilepic
        });
        this.props.history.push('/game');
      } else if (res.data.data === 'LOGIN') {
        this.props.history.push('/');
      }
    });
    this.changeState();
  }

  calculateCurrentSum = () => {
    const currentSum = this.state.selectedNumbers.reduce((a, b) => a + b, 0);
    const currentTargetIsEqual =
      currentSum === this.target
        ? 'EQUAL'
        : currentSum > this.target
        ? 'MORE'
        : 'LESS';
    this.setState({
      currentSum,
      currentTargetIsEqual
    });
  };

  handleDrop = number => {
    const index = this.state.randomNumbers.indexOf(number);
    const randomNumbers = [...this.state.randomNumbers];
    randomNumbers.splice(index, 1);
    this.setState(
      prevState => ({
        randomNumbers: randomNumbers,
        selectedNumbers: [...prevState.selectedNumbers, number]
      }),
      () => {
        this.calculateCurrentSum();
      }
    );
  };

  handleSelectedRemove = number => {
    const index = this.state.selectedNumbers.indexOf(number);
    const selectedNumbers = [...this.state.selectedNumbers];
    selectedNumbers.splice(index, 1);
    this.setState(
      prevState => ({
        selectedNumbers: selectedNumbers,
        randomNumbers: [...prevState.randomNumbers, number]
      }),
      () => {
        this.calculateCurrentSum();
      }
    );
  };

  randomNumbers = Array.from({ length: 7 }).map(
    () => 1 + Math.floor(10 * Math.random())
  );

  target = this.randomNumbers
    .slice(0, 7 - 2)
    .reduce((acc, curr) => acc + curr, 0);

  shuffleRandomNumbers = shuffle(this.randomNumbers);

  changeState = () => {
    this.setState({
      randomNumbers: this.shuffleRandomNumbers
    });

    this.calculateCurrentSum();
  };

  render() {
    return (
      <div className='game'>
        <div className='userName'>
          <img
            src={`${this.state.profilepic}`}
            alt='.'
            className='profilepic'
          />
          <span className='userNameSpan'>Hello, {this.state.name}</span>
        </div>
        <div className=''>
          <div className='resetLogout'>
            <button
              style={{ width: '26rem' }}
              className='btn btn-primary btn-lg reset'
              onClick={this.props.onResetclick}
            >
              Reset
            </button>
          </div>
          <TargetSum
            currentTargetIsEqual={this.state.currentTargetIsEqual}
            currentSum={this.state.currentSum}
            selectedNumbers={this.state.selectedNumbers}
            target={this.target}
            handleSelectedRemove={this.handleSelectedRemove}
          />
          {this.state.currentTargetIsEqual === 'EQUAL' ? (
            <div className='winMessage'>
              <h3>You Won!</h3>
            </div>
          ) : (
            <NumberOptions
              handleDrop={this.handleDrop}
              optionNumbers={this.state.randomNumbers}
            />
          )}
        </div>
        <button
          style={{ width: '10rem' }}
          className='btn btn-primary btn-lg logout'
          onClick={this.props.onLogoutClick}
        >
          Logout?
        </button>
      </div>
    );
  }
}

export default withRouter(Game);
