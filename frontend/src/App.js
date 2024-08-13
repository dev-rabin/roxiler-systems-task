import 'bootstrap/dist/js/bootstrap.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import TransactionsScreen from './screens/transactions_screen';

function App() {
  return (
      <>
        <div className=" text-4xl text-center font-bold my-3">Roxiler task</div>
        <TransactionsScreen/>
      </>
  );
}

export default App;
