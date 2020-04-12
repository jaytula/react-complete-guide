import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationsItems';
import classes from './SideDrawer.module.css';
import Aux from '../../../hoc/Aux';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
  const attachedClasses = [classes.SideDrawer];
  attachedClasses.push(props.open ? classes.Open : classes.Close);

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachedClasses.join(' ')}>
        <div className={classes.Logo}>
          <Logo />
        </div>

        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};

export default SideDrawer;
