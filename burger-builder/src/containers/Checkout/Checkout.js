import React from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
  state = {
    ingredients: {},
    totalPrice: 0,
  };

  componentDidMount() {
    const search = new URLSearchParams(this.props.location.search);

    const ingredients = {};
    const ingredientKeys = ['cheese', 'meat', 'bacon', 'salad'];
    for (let key of ingredientKeys) {
      ingredients[key] = +search.get(key);
    }

    this.setState({ ingredients, totalPrice: search.get('price') });
  }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinuedHandler = () => {
    this.props.history.replace('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          onCheckoutCancelled={this.checkoutCancelledHandler}
          onCheckoutContinued={this.checkoutContinuedHandler}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              totalPrice={this.state.totalPrice}
              {...props}
            />
          )}
        />
        ={' '}
      </div>
    );
  }
}

export default Checkout;
