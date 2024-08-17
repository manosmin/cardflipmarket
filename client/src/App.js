import Table from './components/Table';
import Header from './components/Header';
import Footer from './components/Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  const fetchData = (timeRange) => {
    axios.get(`/api/scryfall?range=${timeRange}`)
          .then((response) => {
              setData(response.data);
          })
          .catch((error) => {
              console.error('Error fetching data:', error);
          });
  };

  useEffect(() => {
      fetchData('today');
  }, []);

  return (
    <div className='bg-amber-950 flex flex-col min-h-screen'>
          <Header onFetchData={fetchData} />
          <Table data={data} />
          <Footer/>
      </div>
  );
}

export default App;
