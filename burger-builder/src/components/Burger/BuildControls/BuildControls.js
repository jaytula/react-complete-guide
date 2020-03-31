import React from 'react';
import BuildControl from './BuildControl/BuildControl';

import classes from './BuildControls.module.css';

const controls = [
  { label: 'Salad', type: 'salad' },
  { label: 'Bacon', type: 'bacon' },
  { label: 'Meat', type: 'meat' },
  { label: 'Cheese', type: 'cheese' }
];

const BuildControls = props => {
  return (
    <div className={classes.BuildControls}>
      {controls.map(ctrl => (
        <BuildControl
          key={ctrl.type}
          label={ctrl.label}
          type={ctrl.type}
        />
      ))}
    </div>
  );
};

export default BuildControls;
