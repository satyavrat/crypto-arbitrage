import React from 'react';

import style from './listStyle.css';
import { Card, CardText} from 'react-toolbox/lib/card';

export default ({data}) => {


  if(data === undefined){
    return <div>No opportunities found!</div>
  }

  return <div className={style.list}>  
  {data.map((arbItem, i) => {
    return <Card key={arbItem.id} className={style.listItem}>
      <div className={style.date}>{arbItem.date}</div>
      <CardText>
      <div className={style.container}>
        <div className={style.gain}>{(arbItem.gain||0).toFixed(2)}</div>
        <div className={style.itemBuySell}>
          <div className={style.itemBold}>{arbItem.e1}</div>
          Buy <span>{arbItem.c1}</span> @ <span className={style.itemBold}>{arbItem.buyPrice}</span>
          <br/>
          Sell <span>{arbItem.c1}</span> @ <span className={style.itemBold}>{arbItem.sellPrice}</span>
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