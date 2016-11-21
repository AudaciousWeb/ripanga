import React from 'react';
import styles from './Ripanga.scss';
import cx from 'classnames';
import qs from 'qs';

const DIRECTION = {
  ASC: 'asc',
  DESC: 'desc',
};

const RipangaHeadCell = ({
  def,
  globalKey,
  onSort,
}) => {
  const url = location.href.split('?');
  const params = qs.parse(url[1]);

  const _onSort = () => {
    if (def.sortable === false) {
      return;
    }

    const attribute = def.sortKey;
    const direction = (params.sort.attribute === attribute
      && params.sort.direction === DIRECTION.ASC
      ? DIRECTION.DESC
      : DIRECTION.ASC);

    params.sort = { attribute, direction };

    sessionStorage.setItem(`${globalKey}/SORT`, JSON.stringify(params.sort));

    history.pushState(
      history.state,
      '',
      `${url[0]}?${qs.stringify(params)}`
    );

    onSort();
  };

  let arrow = null;
  if (def.sortable === true && def.sortKey === params.sort.attribute) {
    arrow = (params.sort.direction === DIRECTION.DESC
      ? <i className="fa fa-long-arrow-down" />
      : <i className="fa fa-long-arrow-up" />);
  }

  return (
    <th onClick={_onSort}
      className={cx(styles['sort-arrow'], {[styles.sortable]: def.sortable })}>
      <span className={styles.label}>{def.label}</span>
      {arrow}
    </th>
  );
};

export default RipangaHeadCell;
