import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';

import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Mail Address',
        },
        value: '',
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password',
        },
        value: '',
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignup: false,
  };

  componentDidMount() {
    if(!this.props.building && this.props.redirectPath !== '/') {
    //  this.props.onSetAuthRedirect();
    }
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '';
    }

    if (isValid && rules.minLength) {
      isValid = value.length >= rules.minLength;
    }

    if (isValid && rules.maxLength) {
      isValid = value.length <= rules.minLength;
    }

    return isValid;
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = { ...this.state.controls };
    updatedControls[controlName] = {
      ...this.state.controls[controlName],
      value: event.target.value,
      valid: this.checkValidity(
        event.target.value,
        this.state.controls[controlName].validation
      ),
      touched: true,
    };
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignup
    );
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignup: !prevState.isSignup };
    });
  };

  render() {
    if (this.props.isAuth) return <Redirect to={this.props.redirectPath} />;
    if (this.props.loading) return <Spinner />;
    const formInputs = [];
    for (let [name, formInput] of Object.entries(this.state.controls)) {
      formInputs.push(
        <Input
          key={name}
          elementType={formInput.elementType}
          elementConfig={formInput.elementConfig}
          changed={e => this.inputChangedHandler(e, name)}
          value={formInput.value}
          invalid={!formInput.valid}
          shouldValidate={formInput.validation}
          touched={formInput.touched}
        />
      );
    }

    let form = (
      <form onSubmit={this.submitHandler}>
        {formInputs}
        <Button btnType='Success'>
          {this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}
        </Button>
      </form>
    );

    let error = null;
    if (this.props.error) {
      error = <p>{this.props.error.message}</p>;
    }
    return (
      <div className={classes.Auth}>
        {error}
        {form}
        <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuth: !!state.auth.token,
  redirectPath: state.auth.redirectPath,
  building: state.burgerBuilder.building
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup)),
  onSetAuthRedirect: () => dispatch(actions.setAuthRedirect('/'))
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
