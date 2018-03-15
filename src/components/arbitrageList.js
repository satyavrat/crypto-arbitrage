import React from 'react';

import style from './listStyle.css';
import { Card, CardText } from 'react-toolbox/lib/card';

import cx from 'classnames';
import _ from 'lodash';
import ListPreview from './listPreview';

import Media from "react-media";

export default class ArbitrageList extends React.Component {
  state = {

  };

  render = () => {
    let data = this.props.data,
      selectedArbId = this.state.currentId;

    if (data === undefined) {
      return <div>No opportunities found!</div>
    }


    if (!data[0]) {
      return <div>No opportunities found!</div>
    }


    if (!selectedArbId) {
      selectedArbId = data[0].id;
    }

    let selectedArbItem = _.find(data, { id: selectedArbId });
    
    return <div className={style.listWrapper} style={{height: window.innerHeight - 64 - 48}}>
      <div className={style.list}>
        {data.map((arbItem, i) => {
          return <div key={arbItem.id} className={cx(style.listItem, selectedArbId === arbItem.id && style.selected)} onClick={() => this.onClickItem(arbItem.id)}>
            <div className={style.date}>{arbItem.date}</div>
            <div>
              <div className={style.container}>
                <div className={style.gain}>{(arbItem.gain || 0).toFixed(2)}</div>
                <div className={style.itemBuySell}>
                  <div className={style.itemBold}>{arbItem.e1}</div>
                  Buy <span>{arbItem.c1}</span> @ <span className={style.itemBold}>{arbItem.buyPrice}</span>
                  <br />
                  Sell <span>{arbItem.c2}</span> @ <span className={style.itemBold}>{arbItem.sellPrice}</span>
                </div>
                <div className={style.itemExchange}>
                  <div className={style.itemBold}>{arbItem.e2}</div>
                  <span className={{}}>{arbItem.c2}</span> from <span className={{}}>{arbItem.c1}</span> @ <span className={style.itemBold}>{arbItem.exchangeRate}</span>
                  <br />
                </div>
              </div>
            </div>
          </div>
        })}
      </div>
      <Media query="(max-width: 599px)">
          {matches =>
            matches ? (
              null
            ) : (
              <ListPreview item={selectedArbItem}/>
            )
          }
        </Media>
    </div>
  }

  onClickItem = (arbId) => {
    this.setState({
      currentId: arbId
    })
  }
}
