import React from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';

class Checkout extends React.Component {
  state = {
    ingredients: {}
  }

  componentDidMount() {
    const search = new URLSearchParams(this.props.location.search);

    const ingredients = {};
    for(let [key, value] of search.entries()) {
      ingredients[key] = +value;
    }

    this.setState({ingredients});
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
        <Route path={this.props.match.path + '/contact-data'} component={ContactData} />
=      </div>
    );
  }
}

export default Checkout;
