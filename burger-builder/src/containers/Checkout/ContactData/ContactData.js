import React, { useState } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';

import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

import axios from '../../../axios-orders';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { updateObject, checkValidity } from '../../../shared/utility';

const ContactData = props => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Your Name',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    street: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Street',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    zipCode: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Postal Code',
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
        maxLength: 5,
      },
      valid: false,
      touched: false,
    },
    country: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Country',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Your Mail',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    deliveryMethod: {
      elementType: 'select',
      elementConfig: {
        options: [
          { value: 'fastest', displayValue: 'Fastest' },
          { value: 'cheapest', displayValue: 'Cheapest' },
        ],
      },
      validation: {},
      valid: true,
      value: 'fastest',
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  const orderHandler = event => {
    event.preventDefault();
    const formData = {};
    for (let formElementIdentifier in orderForm) {
      formData[formElementIdentifier] = orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: props.ingredients,
      price: props.totalPrice,
      orderData: formData,
      userId: props.userId,
    };

    props.onOrderBurger(order, props.token);
  };

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(orderForm[inputIdentifier], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        orderForm[inputIdentifier].validation
      ),
      touched: true,
    });

    const updatedOrderForm = updateObject(orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    updatedOrderForm[inputIdentifier] = updatedFormElement;

    const formIsValid = Object.values(updatedOrderForm).reduce((acc, curr) => {
      return acc && curr.valid;
    }, true);

    setOrderForm(updatedOrderForm);
    setFormIsValid(formIsValid);
  };

  const formInputs = [];
  for (let [name, formInput] of Object.entries(orderForm)) {
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
    <form onSubmit={orderHandler}>
      {formInputs}
      <Button btnType='Success' disabled={!formIsValid}>
        ORDER
      </Button>
    </form>
  );
  if (props.loading) {
    form = <Spinner />;
  }
  return (
    <div className={classes.ContactData}>
      <h4>Enter your Contact Data</h4>
      {form}
    </div>
  );
};

const mapStateToProps = ({ burgerBuilder, order, auth }) => ({
  ingredients: burgerBuilder.ingredients,
  totalPrice: burgerBuilder.totalPrice,
  loading: order.loading,
  token: auth.token,
  userId: auth.userId,
});

const mapDispatchToProps = dispatch => ({
  onOrderBurger: (orderData, token) =>
    dispatch(actions.purchaseBurger(orderData, token)),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
