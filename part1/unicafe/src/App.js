import React, { useState } from 'react';

const Row = ({ text, value }) => <td>{text + ' ' + value}</td>;

const Statistics = ({ good, neutral, bad }) => {
  const average = () => {
    let sum = 0;
    sum += good;
    sum -= bad;
    return sum / (good + neutral + bad);
  };

  const positive = () => good / (good + neutral + bad);

  let results = <p>No feedback given</p>;
  if (good + neutral + bad > 0) {
    results = (
      <table>
        <tbody>
          <tr>
            <Row text={'good'} value={good} />
          </tr>
          <tr>
            <Row text={'neutral'} value={neutral} />
          </tr>
          <tr>
            <Row text={'bad'} value={bad} />
          </tr>
          <tr>
            <Row text={'all'} value={good + neutral + bad} />
          </tr>
          <tr>
            <Row text={'average'} value={average()} />
          </tr>
          <tr>
            <Row text={'positive'} value={positive() * 100 + ' %'} />
          </tr>
        </tbody>
      </table>
    );
  }
  return results;
};

const Button = ({ handleClick, text }) => <button onClick={handleClick}> {text} </button>;

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1> Give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text={'good'} />
      <Button handleClick={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button handleClick={() => setBad(bad + 1)} text={'bad'} />
      <h1> Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

export default App;
