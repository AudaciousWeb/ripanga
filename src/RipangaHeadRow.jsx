import React from 'react';
import RipangaHeadCell from './RipangaHeadCell';
import RipangaCaret from './RipangaCaret';
import styles from './Ripanga.scss';

const RipangaHeadRow = ({
  actions,
  checkedIds,
  columnDefinitions,
  globalKey,
  idKey,
  onCheck,
  onSort,
  renderHeadCell,
  showCheckboxes,
  tableData,
}) => {
  const indices = tableData.reduce((acc, group) => {
    return acc.concat(group.data.map(v => v[idKey]));
  }, []);

  const checkedCount = indices.reduce((acc, i) => {
    if (checkedIds.get(i)) {
      return acc + 1;
    }

    return acc;
  }, 0);

  const _onCheck = (evt) => {
    evt.target.checked
      ? actions.setChecked({ ids: indices, globalKey, onCheck })
      : actions.setUnchecked({ ids: indices, globalKey, onCheck });
  }

  const defaultRenderer = (def, i) => {
    return (<RipangaHeadCell key={`head-${def.sortKey}-${i}`} {...{def, globalKey, onSort }} />);
  };

  const renderCell = (def, i) => {
    if (def.hidden === true) {
      return null;
    }

    return (renderHeadCell
      ? renderHeadCell(defaultRenderer, def, i)
      : defaultRenderer(def, i));
  };

  const cells = columnDefinitions.map(renderCell);

  if (showCheckboxes) {
    cells.unshift(<th className="headControls" key={`headControls`}>
      <input
        type="checkbox"
        checked={indices.length === checkedCount}
        onChange={_onCheck}
      />
    </th>);
  }

  return (
    <thead>
      <tr>
        {cells}
      </tr>
    </thead>
  );
};

export default RipangaHeadRow;
