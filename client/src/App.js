import Table from './components/Table';
import Header from './components/Header';
import Footer from './components/Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);  // Add loading state

  const fetchData = (timeRange) => {
    setLoading(true); // Set loading to true before making the request
    axios.get(`/api/scryfall?range=${timeRange}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false); // Set loading to false once the request is completed
      });
  };

  useEffect(() => {
    fetchData('today');
  }, []);

  return (
    <div className='bg-zinc-900 flex flex-col min-h-screen'>
      <Header onFetchData={fetchData} />
      {loading ? (
        <div className='text-zinc-100 flex justify-center lg:text-base text-sm mt-10'>Loading...</div>  // Loading state indicator
      ) : (
        data.length > 0 ? (
          <Table data={data} />
        ) : (
          <div className='text-zinc-100 flex justify-center items-center mt-10 lg:text-base text-sm'><p>Price spikes not found for the chosen time range.</p></div>
        )
      )}
      <Footer />
    </div>
  );
}

export default App;
