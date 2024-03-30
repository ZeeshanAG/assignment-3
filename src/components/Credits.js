/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Credits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountBalance: this.props.accountBalance,
      creditList: this.props.creditList || [], // Initialize with an empty array if creditList is undefined
    };
  }
  

  creditView = () => {
    const listofCredits = this.state.creditList.map((credit, index) => (
      <li style={{ listStylePosition: 'inside' }} key={index}>
        Description: {credit.description} || Amount: ${credit.amount} || Date:{' '}
        {credit.date.slice(0, 10)}
      </li>
    ));
    return <ul>{listofCredits}</ul>;
  };

  // add credit function
  addCredit = (event) => {
    event.preventDefault();
    const newCredit = {
      description: event.target.description.value,
      amount: event.target.amount.value,
      date: new Date().toISOString(),
    };
    const updatedCredits = [...this.state.creditList, newCredit];
    const newBalance =
      parseFloat(this.state.accountBalance) + parseFloat(newCredit.amount);
    this.setState({
      accountBalance: newBalance.toFixed(2),
      creditList: updatedCredits,
    });
    event.target.reset(); // Reset the form fields after submission
  };

  render() {
    return (
      <div>
        <h1>Credits</h1>
        <br />
        <div>Credits List: {this.creditView()}</div>
        <div>Balance: ${this.state.accountBalance}</div>
        <br />
        <form onSubmit={this.addCredit}>
          <label>
            Description: <input type="text" name="description" required />
          </label>
          <br />
          <label>
            Amount: <input type="number" step="0.01" name="amount" required />
          </label>
          <br />
          <button type="submit">Add Credit</button>
        </form>
        <br />
        <Link to="/debits">Debits</Link>
        <br />
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default Credits;
