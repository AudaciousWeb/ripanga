import React from 'react';
import { connect } from 'react-redux';
import dispatch from './RipangaDispatch';
import selector from './RipangaSelector';

const RipangaInterface = (Component) => {
  const RipangaComponent = props => <Component {...props} />;

  return connect(
    selector,
    dispatch,
  )(RipangaComponent);
};

export default RipangaInterface;
