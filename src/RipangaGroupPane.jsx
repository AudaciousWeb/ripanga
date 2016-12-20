import React from 'react';
import styles from './Ripanga.scss';

export default class RipangaGroupPane extends React.Component {
  static propTypes = {
    colSpan: React.PropTypes.number,
    groupIndex: React.PropTypes.number,
    isHidden: React.PropTypes.bool,
    renderGroupPaneContent: React.PropTypes.func,
  };

  defaultRenderer = () => {
    return (<div className={styles.inside}>
      Group {this.props.groupIndex}
    </div>);
  };

  // shouldComponentUpdate(nextProps) {
  //   return !isEqual(this.props.rowData, nextProps.rowData) ||
  //     !isEqual(this.props.isHidden, nextProps.isHidden);
  // }

  render() {
    const {
      colSpan,
      renderGroupPaneContent,
    } = this.props;

    const pane = renderGroupPaneContent
      ? renderGroupPaneContent(this.defaultRenderer, this.props.groupIndex)
      : this.defaultRenderer();

    return (
      <tr>
        <td colSpan={colSpan} className={styles['groupPane']}>
          {pane}
        </td>
      </tr>
    );
  }
}
