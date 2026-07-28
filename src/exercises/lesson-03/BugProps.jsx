// src/exercises/lesson-03/BugProps.jsx

/*
  BUG #3 — Props Not Updating

  This component displays a message based on a prop and includes
  a button that should change that message.

  Right now, the message is being stored in a way that React does not track,
  so the UI does not update when the value changes.

  Use the commented "Explanation" section at the bottom of this lesson's components.
*/

import { useState } from 'react';

export default function BugProps({ name = 'friend' }) {
  // let message = 'Hello, ' + name;
  const [message, setMessage] = useState('Hello, ' + name);

  function handleChange() {
    // message = 'Hi, ' + name + '!';
    setMessage('Hi, ' + name + '!');
  }

  return (
    <div>
      <p>{message}</p>
      <button onClick={handleChange}>Change Greeting</button>
    </div>
  );
}

// Explanation:
// The original code didn't have state. I changed from let to const so I can make an update to the variable which then allowed me to add state to the function.
