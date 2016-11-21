import React, { PropTypes } from 'react';

const CheckboxCell = ({ checked, onSelect, onDeselect }) => {
  return (
    <td>
      <input
        type="checkbox"
        checked={checked}
        onChange={({target}) => {
          if (target.checked) {
            onSelect();
          } else {
            onDeselect();
          }
        }}
      />
    </td>
  );
};

CheckboxCell.propTypes = {
  onDeselect: PropTypes.func,
  onSelect: PropTypes.func,
};

export default CheckboxCell;
