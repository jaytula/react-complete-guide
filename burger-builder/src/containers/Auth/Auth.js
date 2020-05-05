import React, { Component } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';

import * as actions from '../../store/actions/index';

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
    isSignup: true,
  };

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
        <Button btnType='Success'>{this.state.isSignup ? 'SIGNUP' : 'SIGNIN'}</Button>
      </form>
    );
    return (
      <div className={classes.Auth}>
        {form}
        <Button btnType='Danger' clicked={this.switchAuthModeHandler}>
          SWITCH TO {this.state.isSignup ? 'SIGNIN' : 'SIGNUP'}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = props => ({});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
