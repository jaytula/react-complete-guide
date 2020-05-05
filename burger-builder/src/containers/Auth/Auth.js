import React, { Component } from 'react';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.module.css';

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
      <form onSubmit={this.orderHandler}>
        {formInputs}
        <Button btnType='Success'>
          SUBMIT
        </Button>
      </form>
    );
    return <div className={classes.Auth}>{form}</div>;
  }
}

export default Auth;
