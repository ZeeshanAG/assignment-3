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
      accountBalance: props.accountBalance || 0,
      creditList: props.creditList || [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.accountBalance !== prevProps.accountBalance) {
      this.setState({ accountBalance: this.props.accountBalance });
    }
    if (this.props.creditList !== prevProps.creditList) {
      this.setState({ creditList: this.props.creditList || [] });
    }
  }

  creditView = () => {
    return (
      <ul>
        {this.state.creditList.map((credit, index) => (
          <li style={{ listStylePosition: 'inside' }} key={index}>
            Description: {credit.description} || Amount: ${credit.amount} || Date:{' '}
            {credit.date ? credit.date.slice(0, 10) : ''}
          </li>
        ))}
      </ul>
    );
  };

  addCredit = (event) => {
    event.preventDefault();
    const description = event.target.description.value;
    const amount = parseFloat(event.target.amount.value);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid positive amount.');
      return;
    }
    const newCredit = {
      description: description,
      amount: amount,
      date: new Date().toISOString(),
    };
    const updatedCredits = [...this.state.creditList, newCredit];
    const newBalance = parseFloat(this.state.accountBalance) + amount;
    this.setState({
      accountBalance: newBalance.toFixed(2),
      creditList: updatedCredits,
    });
    event.target.reset();
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
