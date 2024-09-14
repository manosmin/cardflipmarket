import Table from './components/Table';
import Header from './components/Header';
import Footer from './components/Footer';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = (timeRange) => {
    setLoading(true);
    axios.get(`/api/scryfall?range=${timeRange}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData('today');
  }, []);

  return (
    <div className='bg-zinc-900 flex flex-col min-h-screen'>
      <Header onFetchData={fetchData} />
      {loading ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-zinc-500 border-solid border-t-transparent rounded-full animate-spin"></div>
        </div>
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
