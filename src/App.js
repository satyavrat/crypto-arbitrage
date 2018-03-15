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


const base_urls = ['13.126.140.157', '35.154.107.69', '13.127.175.23'];

var audioCtx = new (window.AudioContext || window.webkitAudioContext || window.audioContext);

function beep2(duration, frequency, volume, type, callback) {
  var oscillator = audioCtx.createOscillator();
  var gainNode = audioCtx.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  if (volume){gainNode.gain.value = volume;};
  if (frequency){oscillator.frequency.value = frequency;}
  if (type){oscillator.type = type;}
  if (callback){oscillator.onended = callback;}

  oscillator.start();
  setTimeout(function(){oscillator.stop()}, (duration ? duration : 500));
};
  

const playSound = (gain) => {     
  let slab = 0;
  gain = Math.floor(gain);

  if(gain>=2){
    slab=1/4;
  }
  if(gain>=3){
    slab=1/2;
  }
  if(gain>=5){
    slab=1;
  }
  
  slab && beep2(1000*slab,1000,1, 'sine'); 
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

const findMax = (data) => {

  return data.reduce((acc, item) => {
    return Math.max(item.gain, acc);
  },0)
}

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
      });
    } else {    
      axios.get(`${url}restapi-0.1/rest/u/arbitrage/classic/all?master=sarred1@@&apiKey=${apiKey}&includeBNS=true&disableProxy=true`).then((res) => {
        this.setState({list: res.data.data, loading: false});        
        isPoll && playSound(findMax(res.data.data))
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
          <section style={{height: window.innerHeight-64}}>
            <Tabs theme={styles} className={styles.tabWrap} index={this.state.tabIndex} onChange={this.handleTabChange} inverse>
              <Tab className={styles.tabItem} label='Arbitrage List'>
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

