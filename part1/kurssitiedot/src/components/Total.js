import React from 'react';

const Total = (props) => {
  return (
    <>
      <p>Number of exercises {props.parts.reduce((a, b) => a + b.exercises, 0)}</p>
    </>
  );
};

export default Total;
