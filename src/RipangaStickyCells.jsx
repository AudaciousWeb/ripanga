import React from 'react';
import styles from './Ripanga.scss';

const RipangaStickyCells = ({
  collapsedGroups,
  renderBodyStickyCell,
  renderGroupStickyCell,
  renderGroupStickyPane,
  tableData,
  toggledGroups,
}) => {
  const defaultGroupStickyCellRenderer = () => {
    return null;
  };

  const defaultBodyStickyCellRenderer = () => {
    return null;
  };

  const _renderGroupStickyCell = (groupData, groupIndex) => {
    return (<div className={styles.stickyCellGroup}
      key={`sticky-cell-group-${groupIndex}`}>
      {renderGroupStickyCell
        ? renderGroupStickyCell(defaultGroupStickyCellRenderer, groupData, groupIndex)
        : defaultGroupStickyCellRenderer()}
    </div>);
  };

  const renderBodyStickyCells = (data, groupIndex = 0) => {
    if (collapsedGroups.get(groupIndex) === true ||
      toggledGroups.get(groupIndex) === true) {
      return [];
    }

    return data.map((obj, index) => (<div className={styles.stickyCell}
      key={`sticky-cell-${index}`}>
        {renderBodyStickyCell
          ? renderBodyStickyCell(defaultBodyStickyCellRenderer, obj)
          : defaultBodyStickyCellRenderer(obj)}
      </div>)
    );
  };

  const defaultRenderGroupStickyPane = (groupIndex = 0) => {
    if (collapsedGroups.get(groupIndex) !== true &&
      toggledGroups.get(groupIndex) === true) {
      return (<div className={styles.stickyCellPane}></div>);
    }
  };

  const renderGroupStickyCells = () => {
    const cells = [];

    tableData.forEach((group, index) => {
      cells.push(_renderGroupStickyCell(group.data, index));

      cells.push(renderBodyStickyCells(group.data, index));

      cells.push(defaultRenderGroupStickyPane(index));
    });

    return cells;
  };

  const isNotGrouped = (tableData.length === 1 && tableData[0].key === undefined);

  return (isNotGrouped
    ? renderBodyStickyCells(tableData[0].data)
    : renderGroupStickyCells());
};

export default RipangaStickyCells;
