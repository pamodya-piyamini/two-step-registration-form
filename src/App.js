import logo from './logo.svg';
import './App.css';
import Register from './pages/Register';
import { FormProvider } from './context/formContext';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className='App'>
      <FormProvider>
        <Register />
      </FormProvider>
      <ToastContainer />
    </div>
  );
}

export default App;
