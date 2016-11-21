import React from 'react';
import { render } from 'react-dom';
import Ripanga from '../src';

const def = {
  editable: false,
  hidden: false,
  label: '',
  name: '',
  sortable: false,
  sortKey: '',
};

const renderer = (defaultRenderer, obj) => <td>{obj.text}</td>;

const tableData = [{
  key: undefined, data: [
    { text: 'cellA', key: 'cellA' },
    { text: 'cellB', key: 'cellB' },
    { text: 'cellC', key: 'cellC' },
  ] },
];

const columnDefinitions = [
  Object.assign(Object.assign({}, def), { label: 'Cell A' }),
  Object.assign(Object.assign({}, def), { label: 'Cell B' }),
  Object.assign(Object.assign({}, def), { label: 'Cell C' }),
];

render(
  <Ripanga
    renderBodyCell={renderer}
    columnDefinitions={columnDefinitions}
    idKey="key"
    tableData={tableData}
  />,
  document.getElementById('tableDiv'),
);
