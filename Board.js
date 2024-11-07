import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import React from 'react';
import './Board.css';
 
const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P'];

function Board() {
  return (
    <div className="Board-div">
      <Grid container spacing={1} justify="center">
        {letters.map((letter, index) => (
          <Grid item xs={3} key={index} className="Tile">
            <Paper elevation={4} className="Tile-paper" style={{border: '2px solid #ffc0c0', borderRadius: '5px'}}>
              {letter}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Board;

