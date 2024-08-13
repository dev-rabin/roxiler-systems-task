import React from 'react';
import Table from 'react-bootstrap/Table';

const TransactionsTable = ({ transactions = [] }) => {
    return (
        <>
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
                    transactions.map(transaction => (
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
                        <td colSpan="7" style={{ textAlign: 'center' }}>No transactions available</td>
                    </tr>
                )}
                </tbody>
            </Table>
        </>
    )
}

export default TransactionsTable;
