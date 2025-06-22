  import React, { useState, useEffect } from 'react';
  import Table from '../Components/Table'; 
  import axios from 'axios';

  const TablePage = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      axios.get('http://localhost:5011/tables') // Replace with your API URL
        .then(response => setData(response.data))
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
      <div className='ml-7'>
        <div className='justify-around mt-10 gap-x-8 grid grid-cols-5 gap-8'>
        {data.map((item) => (
    <Table
      key={item.tableId}
      tableNumber={item.tableNumber}
      tableType={item.tableType}
      tableStart={item.tableStart}
      price={item.price}
      status={item.status}
    />
  ))}
        </div>
      </div>
    );
  };

  export default TablePage;
