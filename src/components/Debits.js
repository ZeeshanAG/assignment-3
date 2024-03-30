 /*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Debits extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accountBalance: this.props.accountBalance,
      debitList: this.props.debitList || [],
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.accountBalance !== this.props.accountBalance) {
      this.setState({ accountBalance: this.props.accountBalance });
    }
  }

  debitView = () => {
    const listofDebits = this.state.debitList.map((debit) => (
      <li style={{ listStylePosition: 'inside' }} key={debit.description}>
        Description: {debit.description} || Amount: ${debit.amount} || Date: {debit.date.slice(0, 10)}
      </li>
    ));
    return <ul>{listofDebits}</ul>;
  };

  addDebit = (event) => {
    event.preventDefault();
    const newDebit = {
      description: event.target.description.value,
      amount: event.target.amount.value,
      date: new Date().toISOString(),
    };
    const updatedDebits = [...this.state.debitList, newDebit];
    const newBalance =
      parseFloat(this.state.accountBalance) - parseFloat(newDebit.amount);
    this.setState({
      accountBalance: newBalance.toFixed(2),
      debitList: updatedDebits,
    });
    event.target.reset();
  };

  render() {
    return (
      <div>
        <h1>Debits</h1>
        <br />
        <div>Debits List: {this.debitView()}</div>
        <div>Balance: {this.state.accountBalance}</div>
        <br />
        <form onSubmit={this.addDebit}>
          <label>
            Description: <input type="text" name="description" required />
          </label>
          <br />
          <label>
            Amount: <input type="number" step="0.01" name="amount" required />
          </label>
          <br />
          <button type="submit">Add Debit</button>
        </form>
        <br />
        <Link to="/credits">Credits</Link>
        <br />
        <Link to="/">Return to Home</Link>
      </div>
    );
  }
}

export default Debits;
