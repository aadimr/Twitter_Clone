
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './pages/login/Login';
import Registration from './pages/singUp/Registration';
import Home from './pages/home/middleSection/Feed';

function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<Registration/>}/>
    </Routes>
    </BrowserRouter>
  );
}

export default App;
