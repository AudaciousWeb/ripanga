import React from 'react';
import { isEqual } from 'lodash';
import styles from './Ripanga.scss';

export default class RipangaBodyRow extends React.Component {
  static propTypes = {
    className: React.PropTypes.string,
    columnDefinitions: React.PropTypes.array,
    renderBodyCell: React.PropTypes.func,
    renderBodyRow: React.PropTypes.func,
    rowData: React.PropTypes.object,
    showCheckboxes: React.PropTypes.bool,
  };

  /**
   * IMPORTANT - without this method, the entire table will repaint on each
   * state change, however minor. Ben 160831
   */
  shouldComponentUpdate(nextProps) {
    const id = this.props.rowData[this.props.idKey];

    return (!isEqual(this.props.rowData, nextProps.rowData)) ||
      this.props.checkedIds.get(id) != nextProps.checkedIds.get(id);
  }

  cloneOrRender(Component, props) {
    if (!Component) {
      return null;
    }

    if (React.isValidElement(Component)) {
      return React.cloneElement(Component, props);
    }

    return <Component {...props} />;
  }

  defaultCellRenderer() {
    return <td></td>;
  }

  defaultRowRenderer(cells) {
    return <tr>{cells}</tr>;
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
          ? renderBodyCell(this.defaultCellRenderer, rowData, i)
          : this.defaultCellRenderer();
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
      return renderBodyRow(this.defaultRowRenderer, rowData, cells);
    }

    return this.defaultRowRenderer(cells);
  }
}
