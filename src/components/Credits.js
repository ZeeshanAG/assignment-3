/*==================================================
src/components/Credits.js

The Credits component contains information for Credits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from "react-router-dom";
import AccountBalance from "./AccountBalance";

const Credits = (props) => {
  const { credits, balance, updateAccBalance } = props;

  // Create the list of Credit items
  let newBalance = 0;

  const roundToTwo = (value) => {
    return Math.round(value * 100) / 100;
  };

  // Create the list of Credit items
  const addCredit = (event) => {
    event.preventDefault();
    newBalance = roundToTwo(
      balance + parseFloat(event.target.amount.value)
    );

    const newCredit = {
      id: credits.length + 1,
      description: event.target.description.value,
      amount: parseFloat(event.target.amount.value).toFixed(2),
      date: new Date().toISOString(),
    };

    updateAccBalance(newBalance);
    props.addCredit(newCredit);
    event.target.reset();
  };

  let creditsView = () => {
    const listofCredits = credits.map((credit, index) => (
      <li style={{ listStylePosition: "inside" }} key={index}>
        Description: {credit.description} || Amount: ${credit.amount} || Date:{" "}
        {credit.date.slice(0, 10)}
      </li>
    ));
    return <ul>{listofCredits}</ul>;
  };

  return (
    <div>
      <h1>Credits</h1>
      {creditsView()}
      <br />

      <form onSubmit={addCredit}>
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
      <AccountBalance accountBalance={balance} />
      <br />
      <Link to="/debits">View Debits</Link>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Credits;
