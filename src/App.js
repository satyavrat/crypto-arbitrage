import React, {Component} from 'react';
import logo from './logo.svg';
import styles from './App.css';

import ArbitrageList from './components/arbitrageList';
import ArbitrageTable from './components/arbitrageTable';

import AppBar from 'react-toolbox/lib/app_bar';
import {Tabs, Tab} from 'react-toolbox/lib/tabs';
import axios from 'axios';
import soundUrlAAC from './sounds/button_tiny.aac';
import soundUrlMP3 from './sounds/button_tiny.mp3';

const base_urls = ['13.127.175.23','13.126.140.157', '35.154.107.69'];
  

const playSound = (filename) => {   
  let sound = new Audio(soundUrlMP3);
  sound.play();  
}


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
    this.serverIndex = 0;    
    this.fetchData();
  }

  fetchData(tabNumber, isPoll){

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

    let url =`http://${base_urls[this.serverIndex]}:8080/`;

    if(currentTab === 'table'){
      axios.get(`${url}restapi-0.1/rest/u/arbitrage/crossBuySell/table?master=sarred1@@&apiKey=${apiKey}&currencyCode=${this.state.tableCurrency}&exchanges=BITBNS,BITFINIX,KOINEX,COINDELTA#`).then((res) => {
        this.setState({table: res.data, loading: false});        
        isPoll && playSound()
      });
    } else {    
      axios.get(`${url}restapi-0.1/rest/u/arbitrage/classic/all?master=sarred1@@&apiKey=${apiKey}&includeBNS=true&disableProxy=true`).then((res) => {
        this.setState({list: res.data.data, loading: false});        
        isPoll && playSound()
      });      
    }      

    this.timeout = setTimeout(() => {
      this.serverIndex = (this.serverIndex+1)%3;
      this.fetchData(undefined, true);
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

