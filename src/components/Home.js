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

      <div>
        <h1 style={{ float: 'left',  padding: '10px', color: '#c54c82'}}>National Bank of America</h1>
        <br></br>
        <nav style={{ float: 'right' }}>
          <Link to="/userProfile" style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#E37383', color: '#fff', textDecoration: 'none', marginRight: '10px', border: 'none' }}>User Profile</Link>
          <Link to="/login" style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#E37383', color: '#fff', textDecoration: 'none', marginRight: '10px', border: 'none' }}>Login</Link>
          <Link to="/credits" style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#E37383', color: '#fff', textDecoration: 'none', marginRight: '10px', border: 'none' }}>Credits</Link>
          <Link to="/debits" style={{ padding: '10px', borderRadius: '5px', backgroundColor: '#E37383', color: '#fff', textDecoration: 'none', marginRight: '10px', border: 'none' }}>Debits</Link>
          <br></br>
          <br></br>
          <AccountBalance accountBalance={this.props.accountBalance}/>
        </nav>
        <br></br>
        <img src="https://pngimg.com/d/bank_PNG24.png" alt="bank" width="600" height="600"></img>
        <p>Track your finances using the <b>National Bank of America </b> to help you achieve your financial and investing goals.</p>
      </div>
      


    );
  }
}

export default Home;