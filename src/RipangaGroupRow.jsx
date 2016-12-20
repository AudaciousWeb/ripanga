import React from 'react';

import RipangaCaret from './RipangaCaret';
import styles from './Ripanga.scss';

const RipangaGroupRow = ({
  actions,
  globalKey,
  checkedIds,
  collapseGroup,
  colSpan,
  groupData,
  groupIndex,
  isCollapsed,
  isDisabled,
  isToggled,
  showCheckboxes,
  titleElement,
  toggleGroup,
}) => {
  const indices = groupData.data.map(v => v.id);

  const checkedCount = indices.reduce((acc, i) => {
    if (checkedIds.get(i)) {
      return acc + 1;
    }

    return acc;
  }, 0);

  const _onCheck = (evt) => {
    evt.target.checked
      ? actions.setChecked({ ids: indices, globalKey })
      : actions.setUnchecked({ ids: indices, globalKey });
  }

  const _collapseGroup = () => {
    if (isDisabled === false) {
      collapseGroup(groupIndex);
    }
  };

  // WORKING; but no content ready for group pane. Add {toggle} to final render. Ben 160809
  // const _toggleGroup = () => {
  //   toggleGroup(groupIndex);
  // };
  //
  // const toggle = (isCollapsed ? <div></div> :
  //   <SlideToggle
  //     onToggle={_toggleGroup}
  //     checked={isToggled}
  //   />);

  const checkbox = (showCheckboxes
    ? <input type='checkbox' checked={indices.length === checkedCount} onChange={_onCheck} />
    : null);

  return (
    <tr className={styles['groupRow']}>
      <td colSpan={colSpan}>
        <div className={styles.controls}>
          {checkbox}
          <RipangaCaret disabled={isDisabled} closed={isCollapsed} onClick={_collapseGroup} />
        </div>
        <span className={styles.title}>{titleElement}</span>
      </td>
    </tr>
  );
};

export default RipangaGroupRow;
