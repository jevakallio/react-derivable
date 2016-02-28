import DerivableComponent from '../util/DerivableComponent';
import html from '../util/html';
import * as AppState from '../state/AppState';

import {PropTypes} from 'react';
import {List} from 'immutable';
const {a, ul, li} = html;

const source = {
  numbers: {
    type: PropTypes.instanceOf(List),
    value: AppState.Numbers
  }
};


const Log = DerivableComponent((probe, props = source) => probe ? props : (
  ul({}, props.numbers.map(i =>
    li({key: `item-${i}`},
      a({href: `#/item/${i}`}, `Item ${i}`)
    )
  ))
));

export default Log;
