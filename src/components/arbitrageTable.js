import React, { Component } from 'react';
import { Table, TableHead, TableRow, TableCell } from 'react-toolbox/lib/table';
import styles from './tableStyle.css';
import cx from 'classnames';
const exchanges = [
  {
    id: 'binance',
    label: 'Binance'
  },
  {
    id: 'koinex',
    label: 'Koinex'
  },
  {
    id: 'bitbns',
    label: 'Bitbns'
  },
  {
    id: 'coindeta',
    label: 'Coindelta'
  }
];

const data = [
  [0, 5, 4, 7],
  [-5, 0, 3, 4],
  [-4, -3, 0, 6],
  [-7, -4, -6, 0],
];


const getBGColor = (value, max) => {
  if (value < 0) {
    return `rgba(205, 0, 0, ${-value / max})`
  } else {
    return `rgba(0, 205, 0, ${value / max})`
  }
};

const findMax = data => {
  return data.reduce((max, row) => {
    return Math.max(row.reduce((max, item) => { 
      return Math.max(item.gain, max) 
    }, max), max);
  }, 10)
};

let buildColumns = (rows = []) => {
  return rows;
}

class TableTest extends Component {
  state = {
  };

  render() {


    //if api returned empty
    if (this.props.data && !this.props.data[0]) {
      return <div>No Opportunities found!</div>
    }

    let cols = buildColumns(this.props.data[0])
    let max = findMax(this.props.data);

    return (
      <Table selectable={false} style={{ marginTop: 10, width: 600 }}>
        <TableHead>
          <TableCell className={styles.head}> </TableCell>
          {
            cols.map((ex, i) => {
              return <TableCell key={ex.sellEx} className={cx(styles.exName, styles.head)}>{ex.sellEx}</TableCell>;
            })
          }
        </TableHead>
        {cols.map((ex, index) => {
          return <TableRow key={ex.sellEx}>
            <TableCell className={cx(styles.exName, styles.cell)}>{ex.sellEx}</TableCell>
            {cols.map((item, idx) => {
                let gain = (this.props.data[index][idx].gain || 0).toFixed(2);
                return <TableCell key={idx} style={{ backgroundColor: getBGColor(gain, max) }} className={styles.cell}>{gain}</TableCell>
              })
            }
          </TableRow>
        })}
      </Table>
    );
  }
}

export default TableTest;