import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import styles from './tableStyle.css';
import cx from 'classnames';
const exchanges = [
  {
    id:'binance',
    label:'Binance'
  },
  {
    id:'koinex',
    label:'Koinex'
  },
  {
    id:'bitbns',
    label:'Bitbns'
  },
  {
    id:'coindeta',
    label:'Coindelta'
  }
];

const data = [
  [0, 5, 4, 7],
  [-5, 0, 3, 4],
  [-4, -3, 0, 6],
  [-7, -4, -6, 0],
];


const getBGColor = (value, max) => {
  if(value < 0){
    return `rgba(205, 0, 0, ${-value/max})`
  } else {
    return `rgba(0, 205, 0, ${value/max})`
  }
};

const findMax = data => {
  return data.reduce((max, row) => {
    return Math.max(row.reduce((max, value) => {return Math.max(value, max)}, max), max);
  }, 10)
};

class TableTest extends Component {
  state = {
  };

  render () {
    let max = findMax(data);

    return (
        <Table selectable={false} style={{ marginTop: 10, width: 600}}>
          <TableHead>
            <TableCell className={styles.head}/>
            { exchanges.map(m => <TableCell className={cx(styles.exName, styles.head)}>{m.label}</TableCell>) }
          </TableHead>
          {exchanges.map((ex, index) => {
          return <TableRow key={ex.key}>
            <TableCell className={cx(styles.exName, styles.cell)}>{ex.label}</TableCell>
            { exchanges.map((item, idx) => <TableCell style={{backgroundColor:getBGColor(data[index][idx], max)}} className={styles.cell}>{data[index][idx]}</TableCell>) }
            </TableRow>
          })}
        </Table>
    );
  }
}

export default TableTest;