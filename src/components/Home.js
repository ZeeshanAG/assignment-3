/*==================================================
src/components/Home.js

The Home component is used to demonstrate the use of Link.
==================================================*/
import React, {Component} from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';

class Home extends Component {
  render() {
    return (

      <nav>
        <Link to="/userProfile" style={{ padding: '10px' }}>User Profile</Link>
        <Link to="/login" style={{ padding: '10px' }}>Login</Link>
        <Link to="/credits" style={{ padding: '10px' }}>Credits</Link>
        <Link to="/debits" style={{ padding: '10px' }}>Debits</Link>
        <AccountBalance accountBalance={this.props.accountBalance}/>
      </nav>
      
    );
  }
}

export default Home;