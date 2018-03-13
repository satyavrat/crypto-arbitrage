import React, {Component} from 'react';
import logo from './logo.svg';
import styles from './App.css';

import ArbitrageList from './components/arbitrageList';
import ArbitrageTable from './components/arbitrageTable';

import AppBar from 'react-toolbox/lib/app_bar';
import {Tabs, Tab} from 'react-toolbox/lib/tabs';
import axios from 'axios';

const BASE_URL = 'http://13.127.175.23:8080/';
// const data = [
//   {
//     c1: 'XRP',
//     c2: 'ETH',
//     buyPrice: '71 Rs',
//     sellPrice: '61000 Rs',
//     exchangeRate: '0.043',
//     gain: '2%',
//     e1: 'Koinex',//buy sell
//     e2: 'Binance',
//     date: '22/01/2018',
//     readableString: 'Buy XRP @ 71 Rs sell ETH @ 61000 Rs /n Exchange XRP @ 0.0123 ETH'
//   },
//   {
//     c1: 'XRP',
//     c2: 'ETH',
//     buyPrice: '71 Rs',
//     sellPrice: '61000 Rs',
//     exchangeRate: '0.043',
//     gain: '2%',
//     e1: 'Koinex',//buy sell
//     e2: 'Binance',
//     date: '22/01/2018',
//     readableString: 'Buy XRP @ 71 Rs sell ETH @ 61000 Rs /n Exchange XRP @ 0.0123 ETH'
//   },
//   {
//     c1: 'XRP',
//     c2: 'ETH',
//     buyPrice: '71 Rs',
//     sellPrice: '61000 Rs',
//     exchangeRate: '0.043',
//     gain: '2%',
//     e1: 'Koinex',//buy sell
//     e2: 'Binance',
//     date: '22/01/2018',
//     readableString: 'Buy XRP @ 71 Rs sell ETH @ 61000 Rs /n Exchange XRP @ 0.0123 ETH'
//   },
//   {
//     c1: 'XRP',
//     c2: 'ETH',
//     buyPrice: '71 Rs',
//     sellPrice: '61000 Rs',
//     exchangeRate: '0.043',
//     gain: '2%',
//     e1: 'Koinex',//buy sell
//     e2: 'Binance',
//     date: '22/01/2018',
//     readableString: 'Buy XRP @ 71 Rs sell ETH @ 61000 Rs /n Exchange XRP @ 0.0123 ETH'
//   }
// ];

const CURRENCIES = [
  {
    value:'BTC',
    label:'Bitcoin'
  },
  {
    value:'XRP',
    label:'Ripple'
  }
]

class App extends Component {
  state = {
    tabIndex: 0,
    loading: true,
    table:[[]],
    list:[],
    tableCurrency:CURRENCIES[0].value
  };

  componentDidMount(){
    this.fetchData();
  }

  fetchData(tabNumber){

    let apiKey = this.props.apiKey;
    clearTimeout(this.timeout);

    this.setState({
      loading: true,      
    })

    let currentTab = this.state.tabIndex ? 'table':'list';

    if(tabNumber!== undefined){
      if(tabNumber===0){
        currentTab = 'list'
      } else {
        currentTab = 'table'        
      }
    }    

    if(currentTab === 'table'){
      axios.get(`${BASE_URL}restapi-0.1/rest/u/arbitrage/crossBuySell/table?master=sarred1@@&apiKey=${apiKey}&currencyCode=${this.state.tableCurrency}&exchanges=BITBNS,BITFINIX,KOINEX,COINDELTA#`).then((res) => {
        this.setState({table: res.data, loading: false});
      });
    } else {    
      axios.get(`${BASE_URL}restapi-0.1/rest/u/arbitrage/classic/all?master=sarred1@@&apiKey=${apiKey}&includeBNS=true`).then((res) => {
        this.setState({list: res.data.data, loading: false});
      });      
    }      

    this.timeout = setTimeout(() => {
      this.fetchData();
    }, 10000)    
  }

  handleTabChange = (tabIndex) => {
    this.fetchData(tabIndex);
    this.setState({tabIndex});    
  };

  onCurrencyChange = (currency) => {
    this.setState({tableCurrency:currency, table:[[]]});
  };

  render() {
    if(!this.props.apiKey){
      return<div>Incorrect API Key. Please contact admin</div>
    }

    return (
        <div className={styles.app}>
          <AppBar className={styles.appHeader}>
            <img src={logo} className={styles.appLogo} alt="logo"/>
            <h1 className={styles.appTitle}>Crypto Arbitrage</h1>
          </AppBar>
          <section>
            <Tabs index={this.state.tabIndex} onChange={this.handleTabChange} inverse>
              <Tab label='Arbitrage List'>
              <ArbitrageList data={this.state.list}/>
              </Tab>
              <Tab label='Currency Arbitrage Table'>
              <ArbitrageTable currencies={CURRENCIES} selectedCurrency={this.state.tableCurrency} onCurrencyChange={this.onCurrencyChange} data={this.state.table}/>
              </Tab>
            </Tabs>
          </section>
        </div>
    );
  }
}

export default App;

