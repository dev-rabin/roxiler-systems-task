import React from 'react';
import Table from 'react-bootstrap/Table';

const TransactionsTable = ({ transactions }) => {
  return (
    <>
      <div  className=' w-auto mx-3'>
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Id</th>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Sold</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.id}</td>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>{transaction.price}</td>
                <td>{transaction.category}</td>
                <td>{transaction.sold}</td>
                <td>{transaction.image}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: 'center' }}>No results found</td>
            </tr>
          )}
        </tbody>
      </Table>
      </div>
    </>
  );
};

export default TransactionsTable;
