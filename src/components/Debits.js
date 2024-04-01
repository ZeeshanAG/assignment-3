/*==================================================
src/components/Debits.js

The Debits component contains information for Debits page view.
Note: You need to work on this file for the Assignment.
==================================================*/
import { Link } from "react-router-dom";
import AccountBalance from "./AccountBalance";

const Debits = (props) => {
  const { debits, balance, updateAccBalance } = props;
  // Create the list of Debit items
  let newBalance = 0;

  const addDebit = (event) => {
    event.preventDefault();
    newBalance = (balance - parseFloat(event.target.amount.value)).toFixed(2);
    const newDebit = {
      id: debits.length + 1,
      description: event.target.description.value,
      amount: parseFloat(event.target.amount.value).toFixed(2),
      date: new Date().toISOString(),
    };

    updateAccBalance(newBalance);
    props.addDebit(newDebit);
    event.target.reset();
  };

  let debitsView = () => {
    const listofDebits = debits.map((debit) => (
      <li style={{ listStylePosition: "inside" }} key={debit.description}>
        Description: {debit.description} || Amount: ${debit.amount} || Date:{" "}
        {debit.date.slice(0, 10)}
      </li>
    ));
    return <ul>{listofDebits}</ul>;
  };

  return (
    <div>
      <h1>Debits</h1>
      {debitsView()}
      <br/>
  
      <form onSubmit={addDebit}>
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
      <AccountBalance accountBalance={balance} />
      <br />
      <Link to="/credits">View Credits</Link>
      <br />
      <Link to="/">Return to Home</Link>
    </div>
  );
};

export default Debits;
