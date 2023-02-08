import React, { useState } from 'react';
import './App.css';


function App() {

  const getInitialCount = function() {
    console.log('render');
    return 0;
  }
  // const [count, setCount] = useState(getInitialCount()); // returns [currentValue, functionToChangeCurrentValue]
  // const [count, setCount] = useState(() => getInitialCount()); // returns [currentValue, functionToChangeCurrentValue]
  const [count, setCount] = useState(0); // returns [currentValue, functionToChangeCurrentValue]
  const [user, setUser] = useState('Walter');
  // const [state, setState] = useState({
  //   count: 0,
  //   user: 'Walter'
  // });

  // const increment = function() {
  //   setState(state => ({
  //     ...state,
  //     count: state.count + 1
  //   }))
  // }

  const increment = function() {
    setCount(count => count + 1);
    setCount(count => count + 1);
    setCount(count => count + 1);
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);
  }

  const decrement = function() {
    setCount(count => count - 1);
  }

  const changeUser = function() {
    setUser('Jesse');
  }

  const toggleUser = function() {
    setUser(user => user === 'Walter' ? 'Jesse' : 'Walter');
  }

  return (
    <div className="container">
    <h1>The count is {count}</h1>
    <h1>The user is {user}</h1>
    <button onClick={increment}>Increment</button>
    <button onClick={decrement}>Decrement</button>
    <button onClick={changeUser}>Change User</button>
    <button onClick={toggleUser}>Toggle User</button>
    </div>
  );
}

export default App;