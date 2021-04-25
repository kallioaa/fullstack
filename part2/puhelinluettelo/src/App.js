import React, { useState, useEffect } from 'react';
import personsDAO from './services/personsDAO';

const Persons = ({ persons, setPersons, filter }) => {
  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      const personsCopy = [...persons];
      personsDAO.remove(person.id).then(setPersons(personsCopy.filter((another) => another.id !== person.id)));
    }
  };

  const filtered = [...persons].filter((person) => person.name.toLowerCase().includes(filter.toLowerCase()));
  return (
    <ul>
      {filtered.map((person) => (
        <li key={person.id}>
          {person.name} {person.number} <button onClick={() => removePerson(person)}> remove </button>
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
  const changeNumber = (person) => {
    const changedPerson = { ...person, number: newNumber };
    personsDAO.update(person.id, changedPerson).then((returnedPerson) => {
      setPersons(persons.map((another) => (another.id !== changedPerson.id ? another : returnedPerson)));
    });
  };

  const addDetails = (event) => {
    event.preventDefault();
    if (!persons.map((person) => person.name).includes(newName)) {
      // if name is already in the phone book
      const newPerson = { name: newName, number: newNumber };
      personsDAO.create(newPerson).then((response) => setPersons(persons.concat(response)));
      setNewName('');
      setNewNumber('');
    } else {
      const person = persons.find((person) => person.name === newName);
      if (person) {
        if (person.number !== newNumber && window.confirm(`${person.name} is already added to the phonebook, replace the old number with the new one?`)) {
          changeNumber(person);
        }
      }
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
    personsDAO.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2> Add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />
      <h2> Numbers</h2>
      <Persons persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  );
};

export default App;
