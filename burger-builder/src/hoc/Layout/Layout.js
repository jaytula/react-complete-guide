import React, { useState } from 'react';
import Aux from '../Aux/Aux';
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

const Layout = props => {
  const [sideDrawerIsVisible, setSideDrawerIsVisible] = useState(false);

  const sideDrawerClosedHandler = () => {
    setSideDrawerIsVisible(false);
  };

  const sideDrawerTogglerHandler = () => {
    setSideDrawerIsVisible(prevState => !prevState);
  };

  return (
    <Aux>
      <Toolbar
        open={sideDrawerIsVisible}
        drawerToggleClicked={sideDrawerTogglerHandler}
        isAuth={props.isAuth}
      />
      <SideDrawer
        open={sideDrawerIsVisible}
        closed={sideDrawerClosedHandler}
        isAuth={props.isAuth}
      />
      <main className={classes.Content}>{props.children}</main>
    </Aux>
  );
};

const mapStateToProps = ({ auth }) => ({
  isAuth: !!auth.token,
});

export default connect(mapStateToProps)(Layout);
