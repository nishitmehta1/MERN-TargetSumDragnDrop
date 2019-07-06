import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profilepic: '',
      name: '',
      email: '',
      password: '',
      phone: 0
    };
  }

  onChangeName = e => {
    this.setState({
      name: e.target.value
    });
  };

  onChangeEmail = e => {
    this.setState({
      email: e.target.value
    });
  };

  onChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  onChangePhone = e => {
    this.setState({
      phone: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log('User Account Created', this.state.name);
    const newUser = {
      profilepic: 'https://robohash.org/' + this.state.name + '?size=200x200',
      name: this.state.name,
      email: this.state.email.toLowerCase(),
      password: this.state.password,
      phone: this.state.phone
    };
    axios.post('/users/add', newUser).then(res => {
      console.log(res.data);
    });

    this.setState({
      name: '',
      email: '',
      password: '',
      phone: 0
    });

    this.props.history.push('/');
  };

  render() {
    return (
      <div>
        <div className='title'>
          <span className='titleSpan'>Target Sum Using Drap n' Drop</span>
          <br />
          <h5>
            By, Nishit Mehta{' '}
            <a className='gitlogo' href='https://github.com/nishitmehta1'>
              {' '}
              <img src='github-logo.png' alt='' />{' '}
            </a>
          </h5>
        </div>
        <div className='container'>
          <div className='create'>
            <form className='card' onSubmit={this.onSubmit}>
              <div className='form-group formName'>
                <label htmlFor='exampleInputName1'>Name</label>
                <input
                  type='name'
                  onChange={this.onChangeName}
                  className='form-control'
                  id='exampleInputName1'
                  aria-describedby='emailHelp'
                  placeholder='Enter name'
                />
              </div>
              <div className='form-group formEmail'>
                <label htmlFor='exampleInputEmail1'>Email address</label>
                <input
                  type='email'
                  onChange={this.onChangeEmail}
                  className='form-control'
                  id='exampleInputEmail1'
                  aria-describedby='emailHelp'
                  placeholder='Enter email'
                />
                <small id='emailHelp' className='form-text text-muted'>
                  We'll never share your email with anyone else.
                </small>
              </div>
              <div className='form-group formPassword'>
                <label htmlFor='exampleInputPassword1'>Password</label>
                <input
                  type='password'
                  onChange={this.onChangePassword}
                  className='form-control'
                  id='exampleInputPassword1'
                  placeholder='Password'
                />
              </div>
              <div className='form-group formPhone'>
                <label htmlFor='phone'>Phone</label>
                <input
                  type='phone'
                  className='form-control'
                  onChange={this.onChangePhone}
                  id='phone'
                  aria-describedby='emailHelp'
                  placeholder='Enter name'
                />
              </div>
              <button type='submit' className='loginButton btn-primary'>
                Submit
              </button>
            </form>
            <div className='createAccountLink'>
              <Link to='/'>Already Have an Account?</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default CreateAccount;
