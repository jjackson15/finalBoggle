import React, { useState } from 'react';
import TextField from "@material-ui/core/TextField";
import './GuessInput.css';

function GuessInput() {
	const labelText = 'Label';
	const [count, setCount] = useState(0); // Using useState
  return (
    <div className="Guess-input">
      <div>{labelText}</div>
      <div> Count: {count}</div> {/* Use count here */}
      <TextField onKeyPress={(event) => {
        if (event.key === 'Enter') {
          setCount(count + 1); 
					}
			}}/>
    </div>
  );
}

export default GuessInput;
