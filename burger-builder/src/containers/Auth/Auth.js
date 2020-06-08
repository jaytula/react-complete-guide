import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Auth.module.css';

import * as actions from '../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { updateObject, checkValidity } from '../../shared/utility';

const Auth = props => {
  const [controls, setControls] = useState({
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
  });
  const [isSignup, setIsSignup] = useState(false);

  const { building, redirectPath, onSetAuthRedirect } = props;
  useEffect(() => {
    if (!building && redirectPath !== '/') {
      onSetAuthRedirect();
    }
  }, [building, redirectPath, onSetAuthRedirect]);

  const inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(controls, {
      [controlName]: updateObject(controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          controls[controlName].validation
        ),
        touched: true,
      }),
    });

    setControls(updatedControls);
  };

  const submitHandler = event => {
    event.preventDefault();
    props.onAuth(controls.email.value, controls.password.value, isSignup);
  };

  const switchAuthModeHandler = () => {
    setIsSignup(!isSignup);
  };

  if (props.isAuth) return <Redirect to={props.redirectPath} />;
  if (props.loading) return <Spinner />;
  const formInputs = [];
  for (let [name, formInput] of Object.entries(controls)) {
    formInputs.push(
      <Input
        key={name}
        elementType={formInput.elementType}
        elementConfig={formInput.elementConfig}
        changed={e => inputChangedHandler(e, name)}
        value={formInput.value}
        invalid={!formInput.valid}
        shouldValidate={formInput.validation}
        touched={formInput.touched}
      />
    );
  }

  let form = (
    <form onSubmit={submitHandler}>
      {formInputs}
      <Button btnType='Success'>{isSignup ? 'SIGNUP' : 'SIGNIN'}</Button>
    </form>
  );

  let error = null;
  if (props.error) {
    error = <p>{props.error.message}</p>;
  }
  return (
    <div className={classes.Auth}>
      {error}
      {form}
      <Button btnType='Danger' clicked={switchAuthModeHandler}>
        SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}
      </Button>
    </div>
  );
};

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error,
  isAuth: !!state.auth.token,
  redirectPath: state.auth.redirectPath,
  building: state.burgerBuilder.building,
});

const mapDispatchToProps = dispatch => ({
  onAuth: (email, password, isSignup) =>
    dispatch(actions.auth(email, password, isSignup)),
  onSetAuthRedirect: () => dispatch(actions.setAuthRedirect('/')),
});

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
