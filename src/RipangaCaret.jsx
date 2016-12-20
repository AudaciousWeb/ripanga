import React from 'react';
import styles from './Ripanga.scss';
import cx from 'classnames';

const RipangaCaret = ({
  closed,
  disabled,
  onClick,
}) => {
  return (
    <div className={cx(styles['ripanga-caret'], { [styles.closed]: closed, [styles.disabled]: disabled, })}
      onClick={onClick}
    >
      <i className='fa fa-chevron-down' />
    </div>
  );
};

export default RipangaCaret;
