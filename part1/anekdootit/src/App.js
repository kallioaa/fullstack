import React, { useState } from 'react';

const App = () => {
  const anecdotes = [
    'Adding manpower to a late software project makes it later!',
    'If it hurts, do it more often',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  ];

  const [selected, setSelected] = useState(Math.floor(Math.random() * anecdotes.length));
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

  const handleNewVote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy);
  };

  return (
    <div>
      <h2> Anecdote of the day</h2>
      <p>{anecdotes[selected]}</p>

      <p> has {votes[selected]} votes</p>

      <button onClick={handleNewVote}>vote</button>
      <button onClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))}>next anecdote</button>

      <h2> Anecdote with the most votes </h2>

      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
    </div>
  );
};

export default App;
