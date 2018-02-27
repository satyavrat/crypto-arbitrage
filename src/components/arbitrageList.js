import React from 'react';

import style from './listStyle.css';
import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';

export default ({data}) => {
  return <div className={style.list}>
  {data.map((arbItem) => {
    return <Card className={style.listItem}>
      <div className={style.date}>{arbItem.date}</div>
      <CardText>
      <div className={style.container}>
        <div className={style.gain}>{arbItem.gain}</div>
        <div className={style.itemBuySell}>
          <div className={style.itemBold}>{arbItem.e1}</div>
          Buy <span>{arbItem.c1}</span> @ <span className={style.itemBold}>{arbItem.buyRate}</span>
          <br/>
          Sell <span>{arbItem.c1}</span> @ <span className={style.itemBold}>{arbItem.sellRate}</span>
        </div>
        <div className={style.itemExchange}>
          <div className={style.itemBold}>{arbItem.e2}</div>
          <span className={{}}>{arbItem.c2}</span> from <span className={{}}>{arbItem.c1}</span> @ <span className={style.itemBold}>{arbItem.exchangeRate}</span>
          <br/>
        </div>
      </div>
      </CardText>
    </Card>
  })}
  </div>
}