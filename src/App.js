import React, {Component} from 'react';
import logo from './logo.svg';
import styles from './App.css';

import ArbitrageList from './components/arbitrageList';
import ArbitrageTable from './components/arbitrageTable';

import AppBar from 'react-toolbox/lib/app_bar';
import {Tabs, Tab} from 'react-toolbox/lib/tabs';

const data = [
  {
    c1: 'XRP',
    c2: 'ETH',
    buyRate: '71 Rs',
    sellRate: '61000 Rs',
    exchangeRate: '0.043',
    gain: '2%',
    e1: 'Koinex',//buy sell
    e2: 'Binance',
    date: '22/01/2018',
    readableString: 'Buy XRP @ 71 Rs sell ETH @ 61000 Rs /n Exchange XRP @ 0.0123 ETH'
  },
  {
    c1: 'XRP',
    c2: 'ETH',
    buyRate: '71 Rs',
    sellRate: '61000 Rs',
    exchangeRate: '0.043',
    gain: '2%',
    e1: 'Koinex',//buy sell
    e2: 'Binance',
    date: '22/01/2018',
    readableString: 'Buy XRP @ 71 Rs sell ETH @ 61000 Rs /n Exchange XRP @ 0.0123 ETH'
  },
  {
    c1: 'XRP',
    c2: 'ETH',
    buyRate: '71 Rs',
    sellRate: '61000 Rs',
    exchangeRate: '0.043',
    gain: '2%',
    e1: 'Koinex',//buy sell
    e2: 'Binance',
    date: '22/01/2018',
    readableString: 'Buy XRP @ 71 Rs sell ETH @ 61000 Rs /n Exchange XRP @ 0.0123 ETH'
  },
  {
    c1: 'XRP',
    c2: 'ETH',
    buyRate: '71 Rs',
    sellRate: '61000 Rs',
    exchangeRate: '0.043',
    gain: '2%',
    e1: 'Koinex',//buy sell
    e2: 'Binance',
    date: '22/01/2018',
    readableString: 'Buy XRP @ 71 Rs sell ETH @ 61000 Rs /n Exchange XRP @ 0.0123 ETH'
  }
];


class App extends Component {
  state = {
    tabIndex: 0,
  };

  handleTabChange = (tabIndex) => {
    this.setState({tabIndex});
  };

  handleTableActive = () => {
    console.log('Special one activated');
  };

  handleListActive = () => {

  };

  render() {
    return (
        <div className={styles.app}>
          <AppBar className={styles.appHeader}>
            <img src={logo} className={styles.appLogo} alt="logo"/>
            <h1 className={styles.appTitle}>Crypto Arbitrage</h1>
          </AppBar>
          <section>
            <Tabs index={this.state.tabIndex} onChange={this.handleTabChange} inverse>
              <Tab label='Arbitrage List'><ArbitrageList data={data}/></Tab>
              <Tab label='Currency Arbitrage Table'>
                <ArbitrageTable data={data}/>
              </Tab>
            </Tabs>
          </section>
        </div>
    );
  }
}

export default App;

