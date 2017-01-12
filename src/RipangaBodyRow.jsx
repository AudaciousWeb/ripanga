import React from 'react';
import { isEqual } from 'lodash';

const cloneOrRender = (Component, props) => {
  if (!Component) {
    return null;
  }

  if (React.isValidElement(Component)) {
    return React.cloneElement(Component, props);
  }

  return <Component {...props} />;
};

const defaultCellRenderer = () => {
  return <td />;
};

const defaultRowRenderer = (cells) => {
  return <tr>{cells}</tr>;
};

export default class RipangaBodyRow extends React.Component {
  static propTypes = {
    checkedIds: React.PropTypes.shape(),
    columnDefinitions: React.PropTypes.arrayOf(React.PropTypes.shape()),
    idKey: React.PropTypes.string,
    renderBodyCell: React.PropTypes.func,
    renderBodyRow: React.PropTypes.func,
    rowData: React.PropTypes.shape(),
    showCheckboxes: React.PropTypes.bool,
    actions: React.PropTypes.shape(),
    globalKey: React.PropTypes.string,
    onCheck: React.PropTypes.func,
  };

  /**
   * IMPORTANT - without this method, the entire table will repaint on each
   * state change, however minor. Ben 160831
   */
  shouldComponentUpdate(nextProps) {
    const id = this.props.rowData[this.props.idKey];

    return (!isEqual(this.props.rowData, nextProps.rowData)) ||
      this.props.checkedIds.get(id) !== nextProps.checkedIds.get(id);
  }

  _onCheck = (evt) => {
    const {
      actions,
      globalKey,
      idKey,
      onCheck,
      rowData,
    } = this.props;

    evt.target.checked
      ? actions.setChecked({ ids: [rowData[idKey]], globalKey, onCheck })
      : actions.setUnchecked({ ids: [rowData[idKey]], globalKey, onCheck });
  }

  renderCells() {
    const {
      checkedIds,
      columnDefinitions,
      idKey,
      renderBodyCell,
      rowData,
      showCheckboxes,
    } = this.props;

    const cells = columnDefinitions.map((def, i) => {
      if (def.hidden === true) {
        return null;
      }

      if (def.Cell) {
        const Cell = def.Cell;
        return cloneOrRender(Cell, {
          data: rowData,
          definition: def,
        });
      }

      return renderBodyCell
          ? renderBodyCell(defaultCellRenderer, rowData, i)
          : defaultCellRenderer();
    });

    if (showCheckboxes) {
      cells.unshift(<td key={`${idKey}-checkboxes`}>
        <input
          type="checkbox"
          checked={checkedIds.get(rowData[idKey])}
          onChange={this._onCheck}
        />
      </td>);
    }

    return cells;
  }

  render() {
    const {
      renderBodyRow,
      rowData,
    } = this.props;

    const cells = this.renderCells();

    if (renderBodyRow) {
      return renderBodyRow(defaultRowRenderer, rowData, cells);
    }

    return defaultRowRenderer(cells);
  }
}
