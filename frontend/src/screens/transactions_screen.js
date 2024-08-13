import React, { useState } from 'react'
import TransactionsTable from '../components/transactions_table';
import SearchBox from '../components/search_box';
import MonthDropDown from '../components/month_dropdown';

const TransactionsScreen = () => {

  const [month , setMonth] = useState("March");


  return (
    <>
      <SearchBox />
      <MonthDropDown selectedMonth={month} onChange={setMonth}/>
      <TransactionsTable />
    </>
  )
}

export default TransactionsScreen;
