import React from 'react';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';

class App extends React.Component {
  // state = {
  //   show: true,
  // };

  // componentDidMount() {
  //   setTimeout(() => {
  //     this.setState({ show: false });
  //   }, 5000);
  // }

  render() {
    return (
      <div>
        {/* <Layout>{this.state.show ? <BurgerBuilder /> : null} </Layout> */}
        <BurgerBuilder />
        <Checkout />
      </div>
    );
  }
}

export default App;
