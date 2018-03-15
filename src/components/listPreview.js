

import style from './listPreviewStyles.css';
import React from 'react';

export default ({item}) => {
    return <div className={style.listPreview}>
    <div className={style.gain}>Gain % : {(item.gain || 0).toFixed(2)}</div>
    <div className={style.itemBuySell}>
      <div className={style.itemBold}>{item.e1}</div>
      Buy <span>{item.c1}</span> @ <span className={style.itemBold}>{item.buyPrice}</span>
      <br />
      Sell <span>{item.c2}</span> @ <span className={style.itemBold}>{item.sellPrice}</span>
    </div>
    <div className={style.itemExchange}>
      <div className={style.itemBold}>{item.e2}</div>
      <span className={{}}>{item.c2}</span> from <span className={{}}>{item.c1}</span> @ <span className={style.itemBold}>{item.exchangeRate}</span>
      <br />
  </div>
</div>
}