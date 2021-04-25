import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryList = ({ filteredCountries, setCountryFilter }) => {
  var countryList = <div> Too many matches, specify another filter </div>;
  if (filteredCountries.length === 1) {
    countryList = '';
  } else if (filteredCountries.length <= 10) {
    countryList = (
      <div>
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.alpha2Code}>
              {country.name} <button onClick={() => setCountryFilter(country.name)}> next </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return countryList;
};

const FilterCountries = ({ countries, setFilteredCountries, countryFilter, setCountryFilter }) => {
  useEffect(() => {
    setFilteredCountries([...countries].filter((country) => country.name.toLowerCase().includes(countryFilter.toLowerCase())));
  }, [countryFilter, countries, setFilteredCountries]);

  return (
    <div>
      find countries <input onChange={(event) => setCountryFilter(event.target.value)} value={countryFilter} />
    </div>
  );
};

const CountryInformation = ({ country }) => (
  <div>
    <h1> {country.name} </h1>
    <p> capital {country.capital}</p>
    <p> population {country.population}</p>
  </div>
);

const Languages = ({ country }) => (
  <div>
    <h2> Languages </h2>
    <ul>
      {country.languages.map((language) => (
        <li key={language.iso639_1}>{language.name}</li>
      ))}
    </ul>
  </div>
);

const Flag = ({ country }) => <img alt={`${country.name} flag`} src={country.flag} width='100' />;

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryFilter, setCountryFilter] = useState('');
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then((result) => {
        setCountries(result.data);
        setFilteredCountries(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <FilterCountries countries={countries} setFilteredCountries={setFilteredCountries} countryFilter={countryFilter} setCountryFilter={setCountryFilter} />
      <CountryList filteredCountries={filteredCountries} setCountryFilter={setCountryFilter} />
      {filteredCountries.length === 1 ? <CountryInformation country={filteredCountries[0]} /> : null}
      {filteredCountries.length === 1 ? <Languages country={filteredCountries[0]} /> : null}
      {filteredCountries.length === 1 ? <Flag country={filteredCountries[0]} /> : null}
    </>
  );
};

export default App;
