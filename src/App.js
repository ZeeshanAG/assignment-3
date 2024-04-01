/*==================================================
src/App.js

This is the top-level component of the app.
It contains the top-level state.
==================================================*/
import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

// Import other components
import Home from "./components/Home";
import UserProfile from "./components/UserProfile";
import LogIn from "./components/Login";
import Credits from "./components/Credits";
import Debits from "./components/Debits";

// Import other libraries (needed for API connection)
import axios from "axios";

class App extends Component {
  constructor() {
    // Create and initialize state
    super();
    this.state = {
      accountBalance: 1234567.89,
      creditList: [],
      debitList: [],
      currentUser: {
        userName: "Joe Smith",
        memberSince: "11/22/99",
      },
    };
  }

  updateAccBalance = (newBalance) => {
    this.setState({ accountBalance: newBalance });
  };

  addDebit = (newDebit) => {
    this.setState((prevState) => ({
      debitList: [...prevState.debitList, newDebit],
    }));
  };

  addCredit = (newCredit) => {
    this.setState((prevState) => ({
      creditList: [...prevState.creditList, newCredit],
    }));
  };

  // Update state's currentUser (userName) after "Log In" button is clicked
  mockLogIn = (logInInfo) => {
    const newUser = { ...this.state.currentUser };
    newUser.userName = logInInfo.userName;
    this.setState({ currentUser: newUser });
  };

  async componentDidMount() {
    let creditAPI = "https://johnnylaicode.github.io/api/credits.json";

    try {
      let creditResponse = await axios.get(creditAPI);

      this.setState({ creditList: creditResponse.data });

      const totalCreditSum = creditResponse.data.reduce(
        (total, credit) => total + credit.amount,
        0
      );

      this.updateAccBalance(totalCreditSum);
    } catch (error) {
      if (error.creditResponse) {
        console.log(error.creditResponse.data);
        console.log(error.creditResponse.status);
      }
    }

    let debitAPI = "https://johnnylaicode.github.io/api/debits.json";

    try {
      let debitResponse = await axios.get(debitAPI);

      this.setState({ debitList: debitResponse.data });

      const totalDebitSum = debitResponse.data.reduce(
        (total, debit) => total + debit.amount,
        0
      );

      const newBal = this.state.accountBalance - totalDebitSum;

      this.updateAccBalance(newBal);
    } catch (error) {
      if (error.debitResponse) {
        console.log(error.debitResponse.data);
        console.log(error.debitResponse.status);
      }
    }
  }
  // Create Routes and React elements to be rendered using React components
  render() {
    // Create React elements and pass input props to components
    const HomeComponent = () => (
      <Home accountBalance={this.state.accountBalance} />
    );
    const UserProfileComponent = () => (
      <UserProfile
        userName={this.state.currentUser.userName}
        memberSince={this.state.currentUser.memberSince}
      />
    );
    const LogInComponent = () => (
      <LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} />
    );
    const CreditsComponent = () => (
      <Credits
        credits={this.state.creditList}
        balance={this.state.accountBalance}
        addCredit={this.addCredit}
        updateAccBalance={this.updateAccBalance}
      />
    );
    const DebitsComponent = () => (
      <Debits
        debits={this.state.debitList}
        balance={this.state.accountBalance}
        addDebit={this.addDebit}
        updateAccBalance={this.updateAccBalance}
      />
    );

    // Important: Include the "basename" in Router, which is needed for deploying the React app to GitHub Pages
    return (
      <Router basename="/bank-of-react-starter-code">
        <div>
          <Route exact path="/" render={HomeComponent} />
          <Route exact path="/userProfile" render={UserProfileComponent} />
          <Route exact path="/login" render={LogInComponent} />
          <Route exact path="/credits" render={CreditsComponent} />
          <Route exact path="/debits" render={DebitsComponent} />
        </div>
      </Router>
    );
  }
}

export default App;
