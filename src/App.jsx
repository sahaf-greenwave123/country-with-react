import React, { useEffect, useState } from 'react';


const App = () => {
  const [countries, setCountries] = useState([]);
  const [countryDetails, setCountryDetails] = useState(null);

  useEffect(() => {
    const loadCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v3.1/all');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    loadCountries();
  }, []);

  const loadCountryDetails = async (countryName) => {
    try {
      const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
      const data = await response.json();
      setCountryDetails(data[0]);
    } catch (error) {
      console.error('Error fetching country details:', error);
    }
  };
//----------------------------nav and home-------------------------------------//
  return (
    <div>
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Country Explorer</h1>
        <nav>
          <ul className="flex gap-4">
            <li><a href="#countries" className="hover:underline">Home</a></li>
            <li><a href="#countries" className="hover:underline">About</a></li>
            <li><a href="#details" className="hover:underline">Country Details</a></li>
          </ul>
        </nav>
      </header>

      <main className="p-4">
        <div id="details">
          {countryDetails && (
            <div className="border border-green-300 rounded-lg p-4 shadow-lg">
              <img src={countryDetails.flags.png} alt="Flag" className="w-full h-lvh object-cover rounded-t-lg" />
              <h3 className="text-xl font-semibold mt-4">Name: {countryDetails.name.common}</h3>
              <p className="text-gray-700">Capital: {countryDetails.capital}</p>
              <p className="text-gray-700">Population: {countryDetails.population}</p>
              <p className="text-gray-700">Area: {countryDetails.area} sq km</p>
            </div>
          )}
        </div>

        <div id="countries" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
          {countries.map((country) => (
            <div key={country.name.common} className="border border-green-300 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
              <img src={country.flags.png} alt={`Flag of ${country.name.common}`} className="w-full h-72 object-cover rounded-t-lg" />
              <h3 className="text-xl font-semibold mt-4">Name: {country.name.common}</h3>
              <p className="text-gray-700">Capital: {country.capital}</p>
              <button onClick={() => loadCountryDetails(country.name.common)} className="mt-4 bg-purple-500 text-white py-2 px-4 rounded-lg hover:bg-purple-600">Show Details</button>
            </div>
          ))}
        </div>
      </main>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2025 Country Explorer. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;


