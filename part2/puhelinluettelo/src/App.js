import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Persons = ({ persons, filter }) => {
  const filtered = [...persons].filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));
  return (
    <ul>
      {filtered.map((person) => (
        <li key={person.id}>
          {person.name} {person.number}
        </li>
      ))}
    </ul>
  );
};

const Filter = ({ filter, setFilter }) => (
  <div>
    filter shown with <input onChange={(event) => setFilter(event.target.value)} value={filter} />
  </div>
);

const PersonForm = ({ persons, setPersons, newName, setNewName, newNumber, setNewNumber }) => {
  const addDetails = (event) => {
    event.preventDefault();
    if (!persons.map((person) => person.name).includes(newName)) {
      // if name is already in the phone book
      setPersons(persons.concat({ id: persons.length, name: newName, number: newNumber }));
      setNewName('');
      setNewNumber('');
    } else {
      window.alert(`${newName} is already added to the phone book`);
    }
  };

  return (
    <form onSubmit={addDetails}>
      <div>
        name: <input onChange={(event) => setNewName(event.target.value)} value={newName} />
      </div>
      <div>
        number: <input onChange={(event) => setNewNumber(event.target.value)} value={newNumber} />
      </div>
      <div>
        <button type='submit'>add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [filter, setFilter] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((response) => {
        console.log('JSON data fetched');
        setPersons(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2> Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2> Numbers</h2>
      <Persons persons={persons} filter={filter} />
    </div>
  );
};

export default App;
