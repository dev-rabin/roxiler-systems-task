import React, { useEffect, useState } from 'react';
import TransactionsTable from '../components/transactions_table';
import SearchBox from '../components/search_box';
import MonthDropDown from '../components/month_dropdown';
import Pagination from '../components/pagination';
import axios from 'axios';
import Barchart from '../components/barchart';
import Statistics from '../components/statistics';

const baseUrl = process.env.REACT_APP_BASE_URL;
console.log("baseUrl:", baseUrl);

const TransactionsScreen = () => {
  const [month, setMonth] = useState('March');
  const [search, setSearch] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [pages, setPages] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchTransactions = async () => {
    try {
      const response = await axios.get(`${baseUrl}/transactions`, {
        params: { month, search, pages }
      });
      const transactionsData = response.data;
      console.log('API Response:', transactionsData);
      setTransactions(transactionsData.data);
      setTotalPages(transactionsData.pagination.totalPages);
    } catch (err) {
      console.error('Error fetching transactions!', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [month, search, pages]);

  return (
    <>
      <div className='flex items-center'>
        <SearchBox search={search} onChange={setSearch}/>
        <MonthDropDown selectedMonth={month} onChange={setMonth}/>
      </div>

      <TransactionsTable transactions={transactions} />
      <Pagination page={pages} totalPages={totalPages} onPageChange={setPages} />

      <div className=' flex justify-center items-center mb-10'>
        <Barchart month={month} />
        <Statistics month={month} />
      </div>
    </>
  );
};

export default TransactionsScreen;
