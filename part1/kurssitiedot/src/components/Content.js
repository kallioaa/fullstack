import React from 'react';

const Part = (part) => {
  return <li key={part.name}>{part.name + ' ' + part.exercises}</li>;
};

const Content = (props) => {
  return <>{props.parts.map(Part)}</>;
};

export default Content;
