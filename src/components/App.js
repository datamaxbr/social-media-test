import React, { Component } from 'react';
import Web3 from 'web3';
import logo from '../logo.png';
import './App.css';
import Navbar from './Navbar';

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You may want to consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load the account
    const accounts = await web3.eth.getAccounts()
    console.log(accounts)
    this.setState({ account: accounts[0] })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: ''
    }
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto"> <br/>
                <a
                  href="https://cyberassistance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                <img src={logo} className="App-logo" alt="logo" />
                </a>
                <br/><br/>
                <h1>Decentralized Social Network</h1>
                <h1>ETH DAPP Demonstration</h1>
                <p>
                  Using Smart Contracts with Ether on the Ethereum Network 
                </p>
                <p>
                  Allowing any authors to post new content <br/>
                  and allowing any readers to tip the authors.  
                </p>
                <a
                  className="App-link"
                  href="https://cyberassistance.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  BLOCKCHAIN WORKBENCH AREA
                </a>
              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
