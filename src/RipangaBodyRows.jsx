import React from 'react';
import styles from './Ripanga.scss';

import RipangaGroupPane from './RipangaGroupPane';
import RipangaGroupRow from './RipangaGroupRow';
import RipangaBodyRow from './RipangaBodyRow';

const RipangaBodyRows = ({
  actions,
  checkedIds,
  columnDefinitions,
  collapsedGroups,
  globalKey,
  idKey,
  onCheck,
  renderBodyCell,
  renderBodyRow,
  renderGroupTitle,
  renderGroupPaneContent,
  setCheckedOne,
  showCheckboxes,
  tableData,
  toggledGroups,
}) => {
  const renderBodyRows = (data, groupIndex = 0) => {
    if (collapsedGroups.get(groupIndex) === true ||
      toggledGroups.get(groupIndex) === true) {
      return [];
    }

    return data.map((rowData) => {
      return (<RipangaBodyRow
        key={`ripanga-body-${rowData[idKey]}`}
        {...{ actions,
          checkedIds,
          columnDefinitions,
          globalKey,
          idKey,
          onCheck,
          renderBodyCell,
          renderBodyRow,
          rowData,
          showCheckboxes }}
      />);
    });
  };

  const renderGroupRow = (groupData, groupIndex = 0) => {
    const { collapseGroup, toggleGroup } = actions;

    const initialVal = (showCheckboxes ? 1 : 0);

    const colSpan = columnDefinitions
      .reduce((p, _, i, a) => {
        return (!a[i].hidden ? p + 1 : p);
      }, initialVal);

    const titleElement = (renderGroupTitle === undefined
      ? (<span className={styles.title}>{groupData.key.name}</span>)
      : renderGroupTitle(groupData, groupIndex));

    return (<RipangaGroupRow
      key={`group-row-${groupIndex}`}
      isCollapsed={collapsedGroups.get(groupIndex)}
      isDisabled={groupData.data.length === 0}
      isToggled={toggledGroups.get(groupIndex)}
      {...{ actions, collapseGroup, colSpan, globalKey, groupIndex, showCheckboxes, titleElement, toggleGroup, groupData, checkedIds }}
    />);
  };

  const renderGroupPane = (groupIndex = 0) => {
    if (collapsedGroups.get(groupIndex) === true ||
      !toggledGroups.get(groupIndex) === true) {
      return [];
    }

    const colSpan = columnDefinitions
      .reduce((p, c, i, a) => {
        return (a[i].hidden === false ? p + 1 : p);
      }, 0);

    return (<RipangaGroupPane
      {...{ colSpan, groupIndex, renderGroupPaneContent }}
      key={`group-pane-${groupIndex}`}
    />);
  };

  const renderBodyGroups = () => {
    const groups = [];
    tableData.forEach((groupData, index) => {
      groups.push(renderGroupRow(groupData, index));
      groups.push(renderGroupPane(index));
      groups.push(...renderBodyRows(groupData.data, index));
    });

    return groups;
  };

  const isGrouped = (tableData.length > 0 && tableData[0].key !== undefined);

  const rows = (isGrouped
    ? renderBodyGroups()
    : renderBodyRows(tableData[0].data));

  return (<tbody>{rows}</tbody>);
};

export default RipangaBodyRows;
